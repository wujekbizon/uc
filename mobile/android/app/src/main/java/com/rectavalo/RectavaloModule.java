package com.rectavalo;

/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */


import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import java.io.File;
import java.io.IOException;
import java.io.FileOutputStream;
import java.io.FileInputStream;
import java.io.FileDescriptor;
import java.nio.channels.FileChannel;
import android.content.res.AssetFileDescriptor;
import android.content.res.AssetManager;

@ReactModule(name = RectavaloModule.TAG)
public final class RectavaloModule
    extends ReactContextBaseJavaModule {

  private ReactApplicationContext reactContext;
  public static final String TAG = "Rectavalo";

  static {
    try {
      System.loadLibrary("rectavalo");
      Log.d(TAG, "-------- librectavalo: loaded");
    } catch (Exception e){
      Log.d(TAG, "-------- librectavalo: loaded");
    }
  }

  public static native void setCwd(String path);
  RectavaloModule(ReactApplicationContext reactContext) {
    super(reactContext);
    this.reactContext = reactContext;
    setCwd(this.reactContext.getApplicationInfo().dataDir);
  }

  @Override
  public String getName() {
    return TAG;
  }

  public static void copyFdToFile(FileDescriptor src, File dst) throws IOException {
    FileChannel inChannel = new FileInputStream(src).getChannel();
    FileChannel outChannel = new FileOutputStream(dst).getChannel();
    try {
      inChannel.transferTo(0, inChannel.size(), outChannel);
    } finally {
      if (inChannel != null)
        inChannel.close();
      if (outChannel != null)
        outChannel.close();
    }
  }

  protected void copyAssets(WritableMap response) {
    AssetManager am = this.reactContext.getAssets();
    AssetFileDescriptor afd = null;
    // try {
      // This isn't used, using metro resolver instead. In production we will need a scheme handler to load html from assets
      // afd = am.openFd(".env.json");
      // File file = new File(".env.json");
      // these functions should work
      // file.createNewFile();
      // copyFdToFile(afd.getFileDescriptor(), file);
    // } catch (IOException e) {
    //   java.io.StringWriter sw = new java.io.StringWriter();
    //   java.io.PrintWriter pw = new java.io.PrintWriter(sw);
    //   e.printStackTrace(pw);
    //   response.putString("error", sw.toString());
    // }
  }

  @ReactMethod void init(final Promise promise) {
    final WritableMap response = Arguments.createMap();
    copyAssets(response);
    promise.resolve(response);
  }

  public static native String helloNative();
  @ReactMethod void hello(final Promise promise) {
    String result = helloNative();

    final WritableMap response = Arguments.createMap();
    response.putString("result", String.valueOf(result));
    promise.resolve(response);
  }

  public static native String onMessage(String messageBody);
  @ReactMethod void nativeCall(String messageBody, final Promise promise) {
    String result = onMessage(messageBody);

    final WritableMap response = Arguments.createMap();
    response.putString("result", String.valueOf(result));
    promise.resolve(response);
  }
}
