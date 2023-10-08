#ifndef _RECTAVALO_IO_H_
#define _RECTAVALO_IO_H_

#include <iostream>
#include <json/json.h>

namespace rectavalo::io {

  Json::Value io_onMessage(const std::string fn, const Json::Value json, const std::vector<Json::Value> args);
  Json::Value readfile(const Json::Value json);
}

#endif