//
//  CallDirectoryHandler.swift
//  CallDetectHandler
//
//  Created by Ian Jovein Yu on 24/09/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

import Foundation
import CallKit

class CallDirectoryHandler: CXCallDirectoryProvider {

    private var ud : UserDefaults?
  
    override func beginRequest(with context: CXCallDirectoryExtensionContext) {
        context.delegate = self
        self.ud = UserDefaults(suiteName: "group.clientell.contacts.lists")
      
        if context.isIncremental {
          addOrRemoveIncrementalIdentificationPhoneNumbers(to: context)
        } else {
          addAllIdentificationPhoneNumbers(to: context)
        }

        context.completeRequest()
    }

    private func addAllBlockingPhoneNumbers(to context: CXCallDirectoryExtensionContext) {
        // Retrieve all phone numbers to block from data store. For optimal performance and memory usage when there are many phone numbers,
        // consider only loading a subset of numbers at a given time and using autorelease pool(s) to release objects allocated during each batch of numbers which are loaded.
        //
        // Numbers must be provided in numerically ascending order.
//        let allPhoneNumbers: [CXCallDirectoryPhoneNumber] = [ 1_408_555_5555, 1_800_555_5555 ]
//        for phoneNumber in allPhoneNumbers {
//            context.addBlockingEntry(withNextSequentialPhoneNumber: phoneNumber)
//        }
    }

    private func addOrRemoveIncrementalBlockingPhoneNumbers(to context: CXCallDirectoryExtensionContext) {
        // Retrieve any changes to the set of phone numbers to block from data store. For optimal performance and memory usage when there are many phone numbers,
        // consider only loading a subset of numbers at a given time and using autorelease pool(s) to release objects allocated during each batch of numbers which are loaded.
//        let phoneNumbersToAdd: [CXCallDirectoryPhoneNumber] = [ 1_408_555_1234 ]
//        for phoneNumber in phoneNumbersToAdd {
//            context.addBlockingEntry(withNextSequentialPhoneNumber: phoneNumber)
//        }
//
//        let phoneNumbersToRemove: [CXCallDirectoryPhoneNumber] = [ 1_800_555_5555 ]
//        for phoneNumber in phoneNumbersToRemove {
//            context.removeBlockingEntry(withPhoneNumber: phoneNumber)
//        }

        // Record the most-recently loaded set of blocking entries in data store for the next incremental load...
    }

    private func addAllIdentificationPhoneNumbers(to context: CXCallDirectoryExtensionContext) {
        // Retrieve phone numbers to identify and their identification labels from data store. For optimal performance and memory usage when there are many phone numbers,
        // consider only loading a subset of numbers at a given time and using autorelease pool(s) to release objects allocated during each batch of numbers which are loaded.
        //
        // Numbers must be provided in numerically ascending order.
        if let ud = self.ud {
          //remove all entries before adding new entries again
//          context.removeAllIdentificationEntries()
          if ud.value(forKey: "ContactList") != nil {
            let contactList : [String:String] = ud.value(forKey: "ContactList") as! [String:String];
            
            let allPhoneNumbers: [String] = contactList.keys.sorted()
            for phoneNumber in allPhoneNumbers {
              context.addIdentificationEntry(withNextSequentialPhoneNumber: CXCallDirectoryPhoneNumber(phoneNumber)!, label: contactList[phoneNumber]!)
            }
          }
        }
    }

    private func addOrRemoveIncrementalIdentificationPhoneNumbers(to context: CXCallDirectoryExtensionContext) {
        // Retrieve any changes to the set of phone numbers to identify (and their identification labels) from data store. For optimal performance and memory usage when there are many phone numbers,
        // consider only loading a subset of numbers at a given time and using autorelease pool(s) to release objects allocated during each batch of numbers which are loaded.
      
        if let ud = self.ud {
          //remove all entries before adding new entries again
          context.removeAllIdentificationEntries()
          
          if ud.value(forKey: "ContactList") != nil {
            let contactList : [String:String] = ud.value(forKey: "ContactList") as! [String:String];
            
            let allPhoneNumbers: [String] = contactList.keys.sorted()
            for phoneNumber in allPhoneNumbers {
              context.addIdentificationEntry(withNextSequentialPhoneNumber: CXCallDirectoryPhoneNumber(phoneNumber)!, label: contactList[phoneNumber]!)
            }
          }
        }

        // Record the most-recently loaded set of identification entries in data store for the next incremental load...
    }

}

extension CallDirectoryHandler: CXCallDirectoryExtensionContextDelegate {

    func requestFailed(for extensionContext: CXCallDirectoryExtensionContext, withError error: Error) {
        // An error occurred while adding blocking or identification entries, check the NSError for details.
        // For Call Directory error codes, see the CXErrorCodeCallDirectoryManagerError enum in <CallKit/CXError.h>.
        //
        // This may be used to store the error details in a location accessible by the extension's containing app, so that the
        // app may be notified about errors which occured while loading data even if the request to load data was initiated by
        // the user in Settings instead of via the app itself.
        print("Show me the error \(error)")
    }

}
