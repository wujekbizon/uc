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

    std::string lastFile;

    try {

    response["pwd"] = std::filesystem::current_path().string();

    for (const auto& entry : std::filesystem::directory_iterator(path)) {
      Json::Value result;
      result["name"] = lastFile = entry.path().stem().string();
      result["ext"] = entry.path().extension().string();
      result["dir"] = std::filesystem::is_directory(entry.path());
      result["size"] = entry.is_regular_file() ? (uint64_t)entry.file_size() : 0;
      result["mtime"] = entry.is_regular_file() ? unixTime(std::filesystem::last_write_time(entry.path())) : 0;

      response["result"].append(result);
    }
    } catch (std::runtime_error e) {
      response["error"] = lastFile  + ": " + e.what();
    }

    return response;
  }
}
