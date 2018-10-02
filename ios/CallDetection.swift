//
//  CallDetection.swift
//  Clientell
//
//  Created by Ian Jovein Yu on 24/09/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import CallKit

@objc(CallDetection)
class CallDetection: NSObject {
  @objc func addContacts(_ contacts: NSArray, contactLabels: NSArray) -> Void {
    // Date is ready to use!
    
    if #available(iOS 10.0, *) {
      let manager : CXCallDirectoryManager = CXCallDirectoryManager.sharedInstance;
      manager.getEnabledStatusForExtension(withIdentifier: "com.sourcetoad.clientell.CallDetectHandler") { (status:CXCallDirectoryManager.EnabledStatus, error:Error?) in
        print("CXCallDirectoryManager status : \(status)");
        if let _ = error {
          print("\(String(describing: error?.localizedDescription))");
        }
        if(status == CXCallDirectoryManager.EnabledStatus.enabled){
          print("OK BOY!")
        }
      };
      
      var finalContactList = [String: String]()

      for (String:phoneNumber, label) in zip(contacts, contactLabels) {
        finalContactList["\(phoneNumber)"] = "\(label)"
      }
      
      if let ud = UserDefaults(suiteName: "group.clientell.contacts.lists") {
        ud.setValue(finalContactList, forKey: "ContactList");
        ud.synchronize();
      
        print("done synchronizing")
        
        manager.reloadExtension(withIdentifier: "com.sourcetoad.clientell.CallDetectHandler", completionHandler: { error in
          if let _ = error{
            print("A error \(error?.localizedDescription as String!)");
          }
          
          let contactList : [String:String] = ud.value(forKey: "ContactList") as! [String:String];
          
          let allPhoneNumbers: [String] = finalContactList.keys.sorted()
          for phoneNumber in allPhoneNumbers {
            print("Calling \(phoneNumber) with label \(contactList[phoneNumber])")
          }
          
          print("done reloading")
        })
      }
      
      /*
       let testValue = ud.value(forKey: "Test");
       当使用不存在的键去访问时，会产生一下错误信息：
       [User Defaults] Couldn't read values in CFPrefsPlistSource<0x11bd421a0> (Domain: group.CSDQAppGroup, User: kCFPreferencesAnyUser, ByHost: Yes, Container: (null), Contents Need Refresh: Yes): Using kCFPreferencesAnyUser with a container is only allowed for System Containers, detaching from cfprefsd
       */
      
      
    }
  }
  
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
}
