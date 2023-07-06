// RCTRectavaloModule.m
#import "RCTRectavaloModule.h"
#include <rectavalo.hpp>

@implementation RCTRectavaloModule

// To export a module named RCTRectavaloModule
RCT_EXPORT_MODULE(Rectavalo);

RCT_EXPORT_METHOD(sourceURLForWebView: (NSString*)message_body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  NSString* response_ns;
  #if DEBUG
    response_ns = @"DEBUG";
  #else
    response_ns = [[[NSBundle mainBundle] URLForResource:@"index" withExtension:@"html" subdirectory:@"react-static"] absoluteString];
  #endif

  if (response_ns == nil)
    response_ns = @"";

  resolve(@{@"result": response_ns});
}

RCT_EXPORT_METHOD(nativeCall: (NSString*)message_body resolver:(RCTPromiseResolveBlock)resolve rejecter:(RCTPromiseRejectBlock)reject) {
  std::string body_str = std::string([message_body UTF8String]);
  auto response = onMessage(body_str);
  
  NSString* response_ns = [NSString 
    stringWithFormat:@"%s", response.c_str()
  ];

  // react native layer sends code back to webview
  resolve(@{@"result": response_ns});
}

@end
