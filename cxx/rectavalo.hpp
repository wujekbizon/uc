#ifndef _RECTAVALO_H
#define _RECTAVALO_H

#include <json/json.h>

#ifdef _WIN32
// Convert a wide Unicode string to an UTF8 string
std::string utf8_encode(const std::wstring& wstr);
std::wstring utf8_decode(const std::string& str);
#endif

const char* hello();
Json::Value parseJson(const std::string& json);
Json::Value parseJson(const std::wstring& json);
Json::Value jsonOk();

std::string onMessage(const std::string& json);
std::wstring onMessage(const std::wstring& json);
std::string json_stringify(const Json::Value json);
Json::Value console_log(const std::vector<Json::Value> args);
std::string onMessage(const Json::Value json);


#ifdef ANDROID
#include <jni.h>
#include <android/log.h>
#define LOG_TAG "OPENCV"
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__)
#endif

#endif
