#include <gtkmm.h>
#include <filesystem>
#include <iostream>
#include "webview.hpp"

#ifndef DEBUG
#define DEBUG "0"
#endif

void on_message(const std::string &msg) {

}

int main(int argc, char **argv) {
  Glib::RefPtr<Gtk::Application> app = Gtk::Application::create(argc, argv, "com.webviewapplication");
  Gtk::Window window;
  window.set_default_size(1024, 768);
  GtkWidget * window_ptr = static_cast<GtkWidget *>((void*)(&window));
  std::cout << "window: " << window_ptr << std::endl;

  auto wv = new webview(DEBUG, window_ptr);


  std::string url;
  if (argc > 1) {
    url = std::string(argv[1]);
  } else {
		std::string fsPath;
		fsPath.append("file://");
		fsPath.append((std::filesystem::current_path().string()));
		fsPath.append("/boot.html");
    std::cout << "boot: " << fsPath << std::endl;
		url = fsPath;
  }
  
  wv->navigate(url.c_str());

  window.add(*Glib::wrap(GTK_WIDGET(wv->m_webview)));
  gtk_widget_grab_focus(GTK_WIDGET(wv->m_webview));

  
  window.show_all();
  app->run(window);
  exit(0);
  std::cout << "app exit " << std::endl;
  return 0;
}
