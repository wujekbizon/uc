//
//  main.m
//  WKWebView
//
//  Created by Michael Ribbons on 16/6/2023.
//

#import <Cocoa/Cocoa.h>
#include "WebViewWindow.h"
#import <WebKit/WebKit.h>

WebViewWindow* setupWebViewWindow() {
    WebViewWindow  *myWindow;      // typed pointer to NSWindow object
    NSRect    graphicsRect;  // contains an origin, width, height

    // initialize the rectangle variable
    graphicsRect = NSMakeRect(200.0, 350.0, 1280, 720);

    myWindow = [[WebViewWindow alloc]
      initWithContentRect: graphicsRect
      styleMask:NSWindowStyleMaskTitled
      |NSWindowStyleMaskClosable
      |NSWindowStyleMaskMiniaturizable
      backing:NSBackingStoreBuffered
      defer:NO ];

    [[NSApp mainWindow] makeKeyWindow];
    [myWindow setup];
    return myWindow;
}

int main() {
  // https://stackoverflow.com/questions/30269329/creating-a-windowed-application-in-pure-c-on-macos
  @autoreleasepool{
    [NSApplication sharedApplication];
    [NSApp setActivationPolicy:NSApplicationActivationPolicyRegular];
    id applicationName = [[NSProcessInfo processInfo] processName];
    id window = setupWebViewWindow();
    [window cascadeTopLeftFromPoint:NSMakePoint(200,100)];
    [window setTitle: applicationName];
    [window makeKeyAndOrderFront:nil];
    [NSApp activateIgnoringOtherApps:YES];
    [NSApp run];
  }
  return 0;
}
