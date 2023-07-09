//
//  main.m
//  WKWebView
//
//  Created by Michael Ribbons on 16/6/2023.
//

#import <Cocoa/Cocoa.h>
#include "WebViewWindow.h"
#import <WebKit/WebKit.h>

void setup() {
    WebViewWindow  *myWindow;      // typed pointer to NSWindow object
    NSRect    graphicsRect;  // contains an origin, width, height

    // initialize the rectangle variable
    graphicsRect = NSMakeRect(100.0, 350.0, 1280, 720);

    myWindow = [ [WebViewWindow alloc]              // create the window
               initWithContentRect: graphicsRect
                 styleMask:NSWindowStyleMaskTitled
                 |NSWindowStyleMaskClosable
                 |NSWindowStyleMaskMiniaturizable
                           backing:NSBackingStoreBuffered
                             defer:NO ];

    [myWindow setTitle:@"Web View App"];
    [myWindow makeKeyAndOrderFront: nil];
    [myWindow orderFrontRegardless];
    [myWindow setup];
    [NSApp setActivationPolicy:NSApplicationActivationPolicyRegular];
}

int main(int argc, const char * argv[]) {
    NSAutoreleasePool *pool = [[NSAutoreleasePool alloc] init];
    NSApp = [NSApplication sharedApplication];
    setup();
    [NSApp run];
    [NSApp release];      // release the app 
    [pool release];       // release the pool
    return(EXIT_SUCCESS);
}
