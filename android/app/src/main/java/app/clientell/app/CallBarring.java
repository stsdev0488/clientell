package app.clientell.app;
import app.clientell.app.db.Contact;
import app.clientell.app.db.DatabaseHandler;

import java.lang.reflect.Method;
import java.util.Locale;

import android.os.Build;
import android.app.Dialog;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.telephony.PhoneStateListener;
import android.telephony.TelephonyManager;
import android.telephony.PhoneNumberUtils;
import android.view.View;
import android.view.WindowManager;
import android.view.View.OnClickListener;
import android.view.Window;
import android.util.Log;

import android.widget.TextView;
import android.widget.LinearLayout;
import android.widget.ImageButton;

// Extend the class from BroadcastReceiver to listen when there is a incoming call
public class CallBarring extends BroadcastReceiver {
    // This String will hold the incoming phone number
    private static final String TAG = "CallService";
    private String number;
    CustomDialog dialog;
    TelephonyManager telephonyManager;
    PhoneStateListener listener;
    Context context;

    @Override
    public void onReceive(final Context context, Intent intent) {
        // If, the received action is not a type of "Phone_State", ignore it
        if (!intent.getAction().equals("android.intent.action.PHONE_STATE"))
            return;

            // Else, try to do some action
        else {
            this.context = context;
            // Fetch the number of incoming call
            number = intent.getStringExtra(TelephonyManager.EXTRA_INCOMING_NUMBER);

            DatabaseHandler db = new DatabaseHandler(context);
            Contact ctx = db.getContact(number.replace("+", ""));

            // check first if it exists on the current database of contacts


            if (ctx.getID() != 0 ) {
                if(dialog == null){
                    dialog = new CustomDialog(context);
                    Window window = dialog.getWindow();
                    window.setType(WindowManager.LayoutParams.TYPE_APPLICATION_OVERLAY);
                    window.setFlags(WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL, WindowManager.LayoutParams.FLAG_NOT_TOUCH_MODAL);
                    window.clearFlags(WindowManager.LayoutParams.FLAG_DIM_BEHIND);
                    dialog.requestWindowFeature(Window.FEATURE_NO_TITLE);
                    dialog.show();
                }

                telephonyManager = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
                listener = new PhoneStateListener() {
                    @Override
                    public void onCallStateChanged(int state, String incomingNumber) {
                        switch (state) {
                            case TelephonyManager.CALL_STATE_IDLE:
                                dialog.dismiss();
                                break;
                        }
                    }
                };

                // Register the listener with the telephony manager
                telephonyManager.listen(listener, PhoneStateListener.LISTEN_CALL_STATE);

                // Check, whether this is a member of "Black listed" phone numbers
                // stored in the database
                /*if (MainActivity.blockList.contains(new Blacklist(number))) {
                    // If yes, invoke the method
                    disconnectPhoneItelephony(context);
                    return;
                }*/
            }
        }
    }

    // Method to disconnect phone automatically and programmatically
    // Keep this method as it is
    @SuppressWarnings({ "rawtypes", "unchecked" })
    private void disconnectPhoneItelephony(Context context) {
        TelephonyManager telephony = (TelephonyManager) context.getSystemService(Context.TELEPHONY_SERVICE);
        try {
            Class c = Class.forName(telephony.getClass().getName());
            Method m = c.getDeclaredMethod("getITelephony");
            m.setAccessible(true);

            Object telephonyService = m.invoke(telephony);
            Method m3 = telephonyService.getClass().getDeclaredMethod("endCall");

            telephonyService = m.invoke(telephony);
            m3.invoke(telephonyService);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    class CustomDialog extends Dialog implements OnClickListener {

        public CustomDialog(Context context) {
            super(context);
            // TODO Auto-generated constructor stub
        }

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            // TODO Auto-generated method stub
            super.onCreate(savedInstanceState);
            setContentView(R.layout.caller_dialog);

            DatabaseHandler db = new DatabaseHandler(context);
            Contact ctx = db.getContact(number.replace("+", ""));

            if (ctx.getID() != 0) {
                Log.i(TAG, ctx.getName());
                Log.i(TAG, "someones calling: "+ number);

                TextView ratingText = (TextView) findViewById(R.id.ratingView);
                TextView phoneText = (TextView) findViewById(R.id.phoneView);
                TextView nameText = (TextView) findViewById(R.id.nameView);

                ratingText.setText(ctx.getRating());
                nameText.setText(ctx.getName());

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
                    phoneText.setText(PhoneNumberUtils.formatNumber(number, Locale.getDefault().getCountry()));
                } else {
                    //Deprecated method
                    phoneText.setText(PhoneNumberUtils.formatNumber(number));
                }
            }

            LinearLayout btnWhole = (LinearLayout) findViewById(R.id.layoutWrapper);
            ImageButton btnClose = (ImageButton) findViewById(R.id.closeButton);

            btnWhole.setOnClickListener(this);
            btnClose.setOnClickListener(this);
        }

        @Override
        public void onClick(View v) {
            // TODO Auto-generated method stub
            Log.d("Button Click:", "clixking button!!!!");
            this.dismiss();
        }
    }
}
