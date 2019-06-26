package app.clientell.app;

import android.os.Bundle;
import com.facebook.react.ReactActivity;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.telecom.TelecomManager;
import android.util.Log;
import android.provider.Settings;
import android.net.Uri;


// react-native-splash-screen >= 0.3.1
import org.devio.rn.splashscreen.SplashScreen; // here

public class MainActivity extends ReactActivity {
    private static final String TAG = "Clientell Main";
    private static final int REQUEST_ID = 123;
    public final static int REQUEST_CODE = 134;

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
     @Override
     public void onCreate(Bundle savedInstanceState) {
         SplashScreen.show(this);  // here
         super.onCreate(savedInstanceState);
     }

    public void requestRole() {
        Intent intent = new Intent(TelecomManager.ACTION_CHANGE_DEFAULT_DIALER);
        intent.putExtra(TelecomManager.EXTRA_CHANGE_DEFAULT_DIALER_PACKAGE_NAME, getPackageName());
        startActivityForResult(intent, REQUEST_ID);
    }

    public void checkDrawOverlayPermission() {
        /** check if we already  have permission to draw over other apps */
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (!Settings.canDrawOverlays(this)) {
                /** if not construct intent to request permission */
                Intent intent = new Intent(Settings.ACTION_MANAGE_OVERLAY_PERMISSION,
                        Uri.parse("package:" + getPackageName()));
                /** request permission via start activity for result */
                startActivityForResult(intent, REQUEST_CODE);
            }
        }
    }

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "Clientell";
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        if (requestCode == REQUEST_CODE) {
            if (Settings.canDrawOverlays(this)) {
                // Your app is now the default dialer app
                Log.i(TAG, "ClienTell will now display an additional dialog when receiving calls");
            } else {
                // Your app is not the default dialer app
                Log.i(TAG, "ClienTell will not be able to display an additional dialog when receiving calls");
            }
        }

        super.onActivityResult(requestCode, resultCode, data);
        MainApplication.getCallbackManager().onActivityResult(requestCode, resultCode, data);
    }
}
