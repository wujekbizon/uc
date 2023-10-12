//
//  WebViewWindow.h
//
//  Created by Michael Ribbons on 16/6/2023.
//

#import <Cocoa/Cocoa.h>

@interface WebViewWindow : NSWindow

- (BOOL) applicationShouldTerminateAfterLastWindowClosed: (NSApplication *) app;
- (void)setup;                                      

@end
