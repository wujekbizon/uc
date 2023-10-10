#ifndef _RECTAVALO_H
#define _RECTAVALO_H

#include <json/json.h>

const std::string FN = "fn";
const std::string NS = "ns";
const std::string CALLBACK_ID = "callbackId";
const std::string ARGS = "args";
const std::string FILE_SYSTEM = "filesystem";
const std::string IO = "io";
const std::string CONSOLE_LOG = "console.log";

#ifdef _WIN32
// Convert a wide Unicode string to an UTF8 string
std::string utf8_encode(const std::wstring& wstr);
std::wstring utf8_decode(const std::string& str);
#endif

const char* hello();
Json::Value parseJson(const std::string& json);
Json::Value parseJson(const std::wstring& json);
Json::Value jsonOk();

Json::Value unknownRequest(std::string fn);
bool hasError(Json::Value response);
bool hasArg      (const Json::Value json, const std::string name, Json::ValueType type);
bool validateArg (const Json::Value json, Json::Value& response, const std::string name, Json::ValueType type);
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
