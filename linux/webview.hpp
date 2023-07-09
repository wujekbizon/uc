#ifndef LINUX_WEBVIEW_H
#define LINUX_WEBVIEW_H

#ifndef WEBVIEW_API
#define WEBVIEW_API extern
#endif

#define WEBVIEW_HINT_NONE 0  // Width and height are default size
#define WEBVIEW_HINT_MIN 1   // Width and height are minimum bounds
#define WEBVIEW_HINT_MAX 2   // Width and height are maximum bounds
#define WEBVIEW_HINT_FIXED 3 // Window size can not be changed by a user

#include <gtkmm.h>
#include <webkit2/webkit2.h>
#include <iostream>

#include "rectavalo.hpp"

#ifdef __cplusplus
extern "C" {
#endif

typedef void *webview_t;


using dispatch_fn_t = std::function<void()>;

class webview {
public:
  GtkWidget *m_window;
  GtkWidget *m_webview;

  webview(bool debug, void *window)
      : m_window(static_cast<GtkWidget *>(window)) {
    g_signal_connect(G_OBJECT(m_window), "destroy",
      G_CALLBACK(+[](GtkWidget *, gpointer arg) {
        static_cast<webview *>(arg)->terminate();
      }),
    this);

    // // Initialize webview widget
    m_webview = webkit_web_view_new();
    WebKitUserContentManager *manager = webkit_web_view_get_user_content_manager(WEBKIT_WEB_VIEW(m_webview));
    g_signal_connect(manager, "script-message-received::callbackHandler",
      G_CALLBACK(+[](WebKitUserContentManager *,
                    WebKitJavascriptResult *r, gpointer arg) {
        auto *w = static_cast<webview *>(arg);
        char *s = get_string_from_js_result(r);
        w->on_message(s);
        g_free(s);
      }),
    this);
    
    webkit_user_content_manager_register_script_message_handler(manager, "callbackHandler");
    init("");

    gtk_container_add(GTK_CONTAINER(m_window), GTK_WIDGET(m_webview));
    gtk_widget_grab_focus(GTK_WIDGET(m_webview));

    WebKitSettings *settings =
      webkit_web_view_get_settings(WEBKIT_WEB_VIEW(m_webview));

    webkit_settings_set_javascript_can_access_clipboard(settings, true);
    webkit_settings_set_allow_file_access_from_file_urls(settings, true);
    // webkit_settings_set_allow_universal_access_from_file_urls(settings, true);

    if (debug) {
      webkit_settings_set_enable_write_console_messages_to_stdout(settings, true);
      webkit_settings_set_enable_developer_extras(settings, true);
    }
  }

  virtual ~webview() = default;
  void *window() { return (void *)m_window; }
  void run() { gtk_main(); }
  void terminate() { gtk_main_quit(); }
  void dispatch(std::function<void()> f) {
    g_idle_add_full(G_PRIORITY_HIGH_IDLE, (GSourceFunc)([](void *f) -> int {
      (*static_cast<dispatch_fn_t *>(f))();
      return G_SOURCE_REMOVE;
    }),
    new std::function<void()>(f),
    [](void *f) { delete static_cast<dispatch_fn_t *>(f); });
  }

  void set_title(const std::string &title) {
    gtk_window_set_title(GTK_WINDOW(m_window), title.c_str());
  }

  void set_size(int width, int height, int hints) {
    gtk_window_set_resizable(GTK_WINDOW(m_window), hints != WEBVIEW_HINT_FIXED);
    if (hints == WEBVIEW_HINT_NONE) {
      gtk_window_resize(GTK_WINDOW(m_window), width, height);
    } else if (hints == WEBVIEW_HINT_FIXED) {
      gtk_widget_set_size_request(m_window, width, height);
    } else {
      GdkGeometry g;
      g.min_width = g.max_width = width;
      g.min_height = g.max_height = height;
      GdkWindowHints h =
          (hints == WEBVIEW_HINT_MIN ? GDK_HINT_MIN_SIZE : GDK_HINT_MAX_SIZE);
      // This defines either MIN_SIZE, or MAX_SIZE, but not both:
      gtk_window_set_geometry_hints(GTK_WINDOW(m_window), nullptr, &g, h);
    }
  }

  void navigate(const std::string &url) {
    webkit_web_view_load_uri(WEBKIT_WEB_VIEW(m_webview), url.c_str());
  }

  void set_html(const std::string &html) {
    webkit_web_view_load_html(WEBKIT_WEB_VIEW(m_webview), html.c_str(), nullptr);
  }

  void init(const std::string &js) {
    WebKitUserContentManager *manager =
      webkit_web_view_get_user_content_manager(WEBKIT_WEB_VIEW(m_webview));
      webkit_user_content_manager_add_script(manager,
        webkit_user_script_new(js.c_str(), WEBKIT_USER_CONTENT_INJECT_TOP_FRAME,
        WEBKIT_USER_SCRIPT_INJECT_AT_DOCUMENT_START, nullptr, nullptr
      ));
  }

  void eval(const std::string &js) {
    webkit_web_view_run_javascript(WEBKIT_WEB_VIEW(m_webview), js.c_str(), nullptr, nullptr, nullptr);
  }

private:
  virtual void on_message(const std::string &body_str) {

    auto response = onMessage(body_str);
    if (response.size() > 0) {
      std::string js = "(() => {window.postMessage(`" + response + "`)})()";
      this->eval(js);
    }
  }

  static char *get_string_from_js_result(WebKitJavascriptResult *r) {
    char *s;
#if WEBKIT_MAJOR_VERSION >= 2 && WEBKIT_MINOR_VERSION >= 22
    JSCValue *value = webkit_javascript_result_get_js_value(r);
    s = jsc_value_to_string(value);
#else
    JSGlobalContextRef ctx = webkit_javascript_result_get_global_context(r);
    JSValueRef value = webkit_javascript_result_get_value(r);
    JSStringRef js = JSValueToStringCopy(ctx, value, nullptr);
    size_t n = JSStringGetMaximumUTF8CStringSize(js);
    s = g_new(char, n);
    JSStringGetUTF8CString(js, s, n);
    JSStringRelease(js);
#endif
    return s;
  }
};

#ifdef __cplusplus
}
#endif
#endif
