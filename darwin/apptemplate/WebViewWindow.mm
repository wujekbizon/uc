//
//  WebViewWindow.m
//
//  Created by Michael Ribbons on 16/6/2023.
//

#import "WebViewWindow.h"
#import <WebKit/WebKit.h>
#import "rectavalo.hpp"
#include <iostream>
#include <string>
#include <filesystem>

@interface WebViewWindow () <WKUIDelegate, WKNavigationDelegate, WKScriptMessageHandler>
@property (nonatomic) WKWebView *webView;
@end

static NSString *RequestURL = @"";

@implementation WebViewWindow

- (void)setup {
    [self setupWebView];

    std::string fsPath;
    fsPath.append("file:///");
    fsPath.append(std::filesystem::current_path().string());
    fsPath.append("/boot.html");

    RequestURL = [NSString 
      stringWithFormat:@"%s", fsPath.c_str()
    ];

    [self setURL: RequestURL];
}

- (void)setupWebView {
    self.webView = [[WKWebView alloc] initWithFrame: [self frame]
                                      configuration: [self setJS]];
    self.webView.UIDelegate = self;
    self.webView.navigationDelegate = self;
    [self.webView.configuration.preferences setValue:@TRUE forKey:@"allowFileAccessFromFileURLs"];
    [self.webView.configuration.preferences setValue:@YES forKey:@"developerExtrasEnabled"];
    [self setContentView:self.webView];
}

- (void)setURL:(NSString *)requestURLString {
    NSURL *url = [[NSURL alloc] initWithString: requestURLString];
    NSURLRequest *request = [[NSURLRequest alloc] 
      initWithURL: url
      cachePolicy: NSURLRequestUseProtocolCachePolicy
      timeoutInterval: 5
    ];
    [self.webView loadRequest: request];
}

- (WKWebViewConfiguration *)setJS {
    NSString *jsString = @"";
    WKUserScript *userScript = [[WKUserScript alloc] initWithSource: jsString
      injectionTime: WKUserScriptInjectionTimeAtDocumentEnd
      forMainFrameOnly:YES
    ];
    WKUserContentController *wkUController = [WKUserContentController new];
    [wkUController addUserScript: userScript];
    [wkUController addScriptMessageHandler:self name:@"callbackHandler"];
    [wkUController addScriptMessageHandler:self name:@"client"];
    
    WKWebViewConfiguration *wkWebConfig = [WKWebViewConfiguration new];
    wkWebConfig.userContentController = wkUController;
    
    return wkWebConfig;
}

- (void)triggerJS:(NSString *)jsString webView:(WKWebView *)webView {
    [webView evaluateJavaScript:jsString
              completionHandler:^(NSString *result, NSError *error){
                  if (error != nil) {
                      NSLog(@"Error: %@", error.localizedDescription);
                      return;
                  }
              }];
}

- (WKWebView *)webView:(WKWebView *)webView
createWebViewWithConfiguration:(WKWebViewConfiguration *)configuration
   forNavigationAction:(WKNavigationAction *)navigationAction
        windowFeatures:(WKWindowFeatures *)windowFeatures {
    
    if (navigationAction.targetFrame != nil &&
        !navigationAction.targetFrame.mainFrame) {
        NSURLRequest *request = [[NSURLRequest alloc] initWithURL: [[NSURL alloc] initWithString: navigationAction.request.URL.absoluteString]];
        [webView loadRequest: request];
        
        return nil;
    }
    return nil;
}

- (void)webView:(WKWebView *)webView runJavaScriptAlertPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(void))completionHandler {
    
}

- (void)webView:(WKWebView *)webView runJavaScriptConfirmPanelWithMessage:(NSString *)message initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(BOOL))completionHandler {
    
}

- (void)webView:(WKWebView *)webView runJavaScriptTextInputPanelWithPrompt:(NSString *)prompt defaultText:(NSString *)defaultText initiatedByFrame:(WKFrameInfo *)frame completionHandler:(void (^)(NSString * _Nullable))completionHandler {
    
}

- (BOOL)webView:(WKWebView *)webView shouldPreviewElement:(WKPreviewElementInfo *)elementInfo {
    return YES;
}

- (void)webView:(WKWebView *)webView decidePolicyForNavigationAction:(WKNavigationAction *)navigationAction decisionHandler:(void (^)(WKNavigationActionPolicy))decisionHandler {
    decisionHandler(WKNavigationActionPolicyAllow);
}

- (void)webView:(WKWebView *)webView didFailProvisionalNavigation:(WKNavigation *)navigation withError:(NSError *)error {
    NSLog(@"error: %ld", (long)error.code);
}

- (void)userContentController:(WKUserContentController *)userContentController didReceiveScriptMessage:(WKScriptMessage *)message {
    if([message.name  isEqual: @"callbackHandler"]) {
        std::string body_str = std::string([message.body UTF8String]);
        auto response = onMessage(body_str);
        NSString* response_ns = [NSString 
            stringWithFormat:@"(() => {window.postMessage(`%s`)})()", response.c_str()
        ];
        [self triggerJS:response_ns webView:self.webView];
    }
}

@end
