#include "filesystem.hpp"
#include <iostream>
#include "rectavalo.hpp"

const std::string LIST_DIR = "listdir";

namespace rectavalo::filesystem {
  Json::Value filesystem_onMessage(const std::string fn, const Json::Value json, const std::vector<Json::Value> args) {
    if (fn == LISTDIR) {
      return listdir(json);
    }
    else {
      return unknownRequest(fn);
    }
  }

  template <class Clock>
  uint64_t unixTime(std::chrono::time_point<Clock> tp) {
    return std::chrono::duration_cast<std::chrono::seconds>(std::chrono::system_clock::now().time_since_epoch()).count();
  }

  Json::Value listdir(const Json::Value json) {
    Json::Value response;
    validateArg(json, response, "path", Json::stringValue);
    if (hasError(response)) return response;
    auto path = json["path"].asString();

    for (const auto& entry : std::filesystem::directory_iterator(path)) {
      Json::Value result;
      result["name"] = entry.path().stem().string().c_str();
      result["ext"] = entry.path().extension().string().c_str();
      result["dir"] = std::filesystem::is_directory(entry.path());
      result["size"] = std::filesystem::file_size(entry.path());
      result["mtime"] = unixTime(std::filesystem::last_write_time(entry.path()));

      response["result"].append(result);
    }

    return response;
  }
}
