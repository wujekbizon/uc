#ifndef _RECTAVALO_FILESYSTEM_H
#define _RECTAVALO_FILESYSTEM_H

#include <filesystem>
#include <json/json.h>

namespace rectavalo::filesystem {

  const std::string LISTDIR = "listdir";

  Json::Value filesystem_onMessage(const std::string fn, const Json::Value json, const std::vector<Json::Value> args);
  Json::Value listdir(const Json::Value json);
}
#endif
