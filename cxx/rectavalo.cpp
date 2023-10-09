#include <iostream>
#include <string>
#include <vector>
#include <rectavalo.hpp>
#include <rectavalo_io.hpp>
#include <codecvt>
#include <locale>
#ifdef _WIN32
#include <Windows.h>
#endif

#include "filesystem.hpp"

std::string value = "Hello from C++!";

#ifdef ANDROID
extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_helloNative(
        JNIEnv *env,
        jobject /* this */) {
  return env->NewStringUTF(hello());
}

extern "C" JNIEXPORT jstring JNICALL
Java_com_rectavalo_RectavaloModule_onMessage(
        JNIEnv *env,
        jobject /* this */,
        jstring messageBody) {
  const char *nativeString = env->GetStringUTFChars(messageBody, 0);
  auto result = env->NewStringUTF(onMessage(std::string(nativeString)).c_str());
  env->ReleaseStringUTFChars(messageBody, nativeString);
  return result;
}

extern "C" JNIEXPORT void JNICALL
Java_com_rectavalo_RectavaloModule_setCwd(
        JNIEnv *env,
        jobject /* this */,
        jstring path) {
  const char *_path = env->GetStringUTFChars(path, 0);
  std::filesystem::current_path(std::string(_path));
  env->ReleaseStringUTFChars(path, _path);
}
#endif

const char* hello() {
  return value.c_str();
}

Json::Value parseJson(const std::string& json) {
  Json::Value root;
  Json::Reader reader;
  reader.parse(json, root);
  return root;
}

#ifdef _WIN32
// Convert a wide Unicode string to an UTF8 string
std::string utf8_encode(const std::wstring& wstr)
{
  if (wstr.empty()) return std::string();
  int size_needed = WideCharToMultiByte(CP_UTF8, 0, &wstr[0], (int)wstr.size(), NULL, 0, NULL, NULL);
  std::string strTo(size_needed, 0);
  WideCharToMultiByte(CP_UTF8, 0, &wstr[0], (int)wstr.size(), &strTo[0], size_needed, NULL, NULL);
  return strTo;
}

// Convert an UTF8 string to a wide Unicode String
std::wstring utf8_decode(const std::string& str)
{
  if (str.empty()) return std::wstring();
  int size_needed = MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), NULL, 0);
  std::wstring wstrTo(size_needed, 0);
  MultiByteToWideChar(CP_UTF8, 0, &str[0], (int)str.size(), &wstrTo[0], size_needed);
  return wstrTo;
}
#endif

Json::Value parseJson(const std::wstring& wide) {
  std::string narrow;
#ifndef _WIN32
    using convert_type = std::codecvt_utf8<wchar_t>;
  std::wstring_convert<convert_type, wchar_t> converter;
  //use converter (.to_bytes: wstr->str, .from_bytes: str->wstr)
  narrow = converter.to_bytes(wide);
#else
    narrow = utf8_encode(wide);
  #endif
  return parseJson(narrow);
}


std::string onMessage(const std::string& json) {
  return onMessage(
    parseJson(json)
  );
}

std::wstring onMessage(const std::wstring& wide) {
  std::string s = onMessage(
    parseJson(wide)
  );

  std::wstringstream cls;
  cls << s.c_str();
  return cls.str();
}

std::string json_stringify(const Json::Value json) {
  Json::StreamWriterBuilder wbuilder;
  wbuilder["commentStyle"] = "None";
  wbuilder["indentation"] = "  ";

  return Json::writeString(wbuilder, json);
}

Json::Value jsonOk() {
  Json::Value ok("Ok");
  return ok;
}

Json::Value console_log(const std::vector<Json::Value> args) {
  for (auto value : args) {
    std::cout << value;
  }
  std::cout << std::endl;
  return jsonOk();
}

Json::Value unknownRequest(std::string fn) {
  Json::Value response;
  response["error"] = "Unknown request: " + fn;
  return response;
}

bool hasError(Json::Value response) {
  return response["error"].size() > 0;
}

bool hasArg(const Json::Value json, const std::string name, Json::ValueType type) {
  return json[name].type() == type;
}

bool validateArg(const Json::Value json, Json::Value& response, const std::string name, Json::ValueType type) {
  if (json[name].type() == type) {
    return true;
  }

  std::string typeName = "";
  switch (type)
  {
  case Json::stringValue:
    typeName = "string";
    break;
  case Json::intValue:
    typeName = "init";
    break;
  case Json::uintValue:
    typeName = "uint";
    break;
  case Json::booleanValue:
    typeName = "boolean";
    break;
  case Json::realValue:
    typeName = "real";
    break;
  case Json::arrayValue:
    typeName = "array";
    break;
  case Json::objectValue:
    typeName = "object";
    break;
  default:
    typeName = "! unsupported type specified.";
    break;
  }

  response["error"]["args"][name] = "Not of type " + typeName;
  return false;
}

std::string onMessage(const Json::Value json) {
  std::string fn;
  std::string ns;
  int callbackId = -1;
  std::vector<Json::Value> args;

  if (json[FN].isString()) {
    fn = json[FN].asString();
  }

  if (json[NS].isString()) {
    ns = json[NS].asString();
  }

  if (json[CALLBACK_ID].isIntegral()) {
    callbackId = json[CALLBACK_ID].asInt();
  }

  if (json[ARGS].isArray()) {
    for (unsigned int x = 0; x < json[ARGS].size(); ++x) {
      args.push_back(json[ARGS][x]);
    }
  }

  Json::Value response;

  // todo: namespace / onMessage map
  if (ns == FILE_SYSTEM) {
    response = rectavalo::filesystem::filesystem_onMessage(fn, json, args);
  } else if (ns == IO) {
    response = rectavalo::io::io_onMessage(fn, json, args);
  }  else {
    if (fn == "nativeHello") {
      response["nativeResult"] = hello();
    }
    else if (fn == CONSOLE_LOG) {
      // should supress console response. Logging this response creates an infinite loop.
      response["result"] = console_log(args);
    }
    else if (fn == "io.readFile") {
      response["error"] = "io.readFile moved.";
    }
    else {
      response = unknownRequest(fn);
    }
  }

  if (callbackId > -1) response[CALLBACK_ID] = callbackId;

  return json_stringify(response);
}
