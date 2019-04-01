package com.clientell.utils;


import com.clientell.db.Contact;
import com.clientell.db.DatabaseHandler;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.Build;
import android.provider.Settings;
import android.util.Log;

public class CallDetectionModule extends ReactContextBaseJavaModule {
    private static final String TAG = "CallService";
    public final static int REQUEST_CODE = 134;
    Context context;

    public CallDetectionModule(ReactApplicationContext reactContext) {
        super(reactContext);
        context = reactContext;
    }

    @Override
    public String getName() {
        return "CallDetection";
    }

    @ReactMethod
    public void checkEnabled(Callback func) {
        Log.i(TAG, "init call detection native package");
        WritableMap map = Arguments.createMap();
        map.putBoolean("enabled", false);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(context)) {
                map.putBoolean("enabled", false);
                func.invoke(map);
            } else {
                map.putBoolean("enabled", true);
                func.invoke(map);
            }
        } else {
            map.putBoolean("enabled", false);
            func.invoke(map);
        }
    }

    @ReactMethod
    public void overlayPermission(Callback func) {
        Log.i(TAG, "init call detection native package");
        WritableMap map = Arguments.createMap();
        map.putBoolean("enabled", false);

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(context)) {
                /** if not construct intent to request permission */
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + context.getPackageName()));
                intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                /** request permission via start activity for result */
                context.startActivity(intent);

                map.putBoolean("enabled", false);
                func.invoke(map);
            } else {
                map.putBoolean("enabled", true);
                func.invoke(map);
            }
        } else {
            map.putBoolean("enabled", false);
            func.invoke(map);
        }
    }

    @ReactMethod
    public void addContacts(ReadableArray phoneEntries) {
        Log.i(TAG, "adding contacts yay!");

        DatabaseHandler db = new DatabaseHandler(context);

        db.emptyContacts();
        if (phoneEntries.size() > 0) {
            for (int i = 0; i < phoneEntries.size(); i++) {
                final ReadableMap button = phoneEntries.getMap(i);
                final String name = button.getString("name");
                final String phone = button.getString("phone");
                final String rating = button.getString("rating");

                Log.d("Name: ", name);
                Log.d("Phone: ", phone);
                Log.d("Phone: ", rating);

                db.addContact(new Contact(name, phone, rating));
            }
        }
    }
}