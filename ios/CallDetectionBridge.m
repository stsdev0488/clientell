//
//  CallDetectionBridge.m
//  Clientell
//
//  Created by Ian Jovein Yu on 24/09/2018.
//  Copyright © 2018 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(CallDetection, NSObject)

RCT_EXTERN_METHOD(addContacts:(NSArray *)contacts contactLabels:(NSArray *)contactLabels)

@end
