// Copyright 2021-present 650 Industries. All rights reserved.

import CoreGraphics
import ExpoModulesCore
import SwiftUI

public class LinearGradientModule: Module {
  public func definition() -> ModuleDefinition {
    Name("ExpoLinearGradient")

    View(LinearGradientSwiftUIView.self)

//    View(LinearGradientView.self) {
//      Prop("colors") { (view: LinearGradientView, colors: [CGColor]) in
//        view.gradientLayer.setColors(colors)
//      }
//
//      Prop("startPoint") { (view: LinearGradientView, startPoint: CGPoint?) in
//        view.gradientLayer.setStartPoint(startPoint)
//      }
//
//      Prop("endPoint") { (view: LinearGradientView, endPoint: CGPoint?) in
//        view.gradientLayer.setEndPoint(endPoint)
//      }
//
//      Prop("locations") { (view: LinearGradientView, locations: [CGFloat]?) in
//        view.gradientLayer.setLocations(locations)
//      }
//    }
  }
}

public final class LinearGradientProps: ExpoSwiftUI.ViewProps {
  @Field
  var colors: [Color] = []

  @Field
  var startPoint: UnitPoint = UnitPoint(x: 0.5, y: 0.0)

  @Field
  var endPoint: UnitPoint = UnitPoint(x: 0.5, y: 1.0)

  @Field
  var locations: [Double] = []
}

struct LinearGradientSwiftUIView: ExpoSwiftUI.View {
  @EnvironmentObject var props: LinearGradientProps

  var body: some View {
    ZStack {
      LinearGradient(
        colors: props.colors,
        startPoint: props.startPoint,
        endPoint: props.endPoint
      )
      Text("SwiftUI in Expo 🔥")
        .font(.system(size: 30))
        .foregroundColor(.white)
    }
  }
}
