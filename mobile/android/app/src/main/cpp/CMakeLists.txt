project(RECTAVALO)

# For more information about using CMake with Android Studio, read the
# documentation: https://d.android.com/studio/projects/add-native-code.html

# Sets the minimum version of CMake required to build the native library.

cmake_minimum_required(VERSION 3.7.0)
set (CMAKE_VERBOSE_MAKEFILE ON)
set (CMAKE_CXX_STANDARD 20)

# Creates and names a library, sets it as either STATIC
# or SHARED, and provides the relative paths to its source code.
# You can define multiple libraries, and CMake builds them for you.
# Gradle automatically packages shared libraries with your APK.

# MDR 03/05/2019 - This strips out debug information, makes binary a lot smaller
set( CMAKE_EXE_LINKER_FLAGS  "${CMAKE_EXE_LINKER_FLAGS} -s" )
set( CMAKE_SHARED_LINKER_FLAGS  "${CMAKE_SHARED_LINKER_FLAGS} -s" )

set(CMAKE_CXX_FLAGS_DEBUG "${CMAKE_CXX_FLAGS_DEBUG} -O0")
set(CMAKE_CXX_FLAGS_RELEASE "${CMAKE_CXX_FLAGS_RELEASE} -Ofast")

add_definitions(-DANDROID)

file(GLOB CXX_SRCS ${CMAKE_SOURCE_DIR}/../../../../../../cxx/*.cpp)

add_library( # Sets the name of the library.
  rectavalo
  # Sets the library as a shared library.
  SHARED
  ${CXX_SRCS}
)

SET(MINIGLOG ON)

include_directories(${CMAKE_SOURCE_DIR}/include
  ${CMAKE_SOURCE_DIR}
  ${CMAKE_SOURCE_DIR}/../../../../../../cxx
)

# Searches for a specified prebuilt library and stores the path as a
# variable. Because CMake includes system libraries in the search path by
# default, you only need to specify the name of the public NDK library
# you want to add. CMake verifies that the library exists before
# completing its build.

find_library(
  android-lib
  android
)

find_library (
  log-lib
  log
)

# Specifies libraries CMake should link to your target library. You
# can link multiple libraries, such as libraries you define in this
# build script, prebuilt third-party libraries, or system libraries.

target_link_libraries( # Specifies the target library.
  rectavalo
  ${android-lib}
  ${log-lib}
)
