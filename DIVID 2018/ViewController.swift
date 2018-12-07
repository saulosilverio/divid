//
//  ViewController.swift
//  DIVID 2018
//
//  Created by Paulo Nhaia on 08/11/2018.
//  Copyright © 2018 Paulo Nhaia. All rights reserved.
//
//

import UIKit
import WebKit

class ViewController: UIViewController, WKScriptMessageHandler {
    
    var webView: WKWebView!
    
    private func setupWebView() {
        
        let contentController = WKUserContentController()
        let userScript = WKUserScript(
            source: "mobileHeader()",
            injectionTime: WKUserScriptInjectionTime.atDocumentEnd,
            forMainFrameOnly: true
        )
        contentController.addUserScript(userScript)
        contentController.add(self, name: "loginAction")
        
        let config = WKWebViewConfiguration()
        config.userContentController = contentController
        self.webView = WKWebView(frame: self.view.bounds, configuration: config)
    }
    
    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        self.setupWebView()
        self.view.addSubview(self.webView)
        
        let htmlPath = Bundle.main.path(forResource: "app", ofType: "html")
        let urlVar = URL.init(fileURLWithPath: htmlPath!)
        let request = URLRequest(url: urlVar,
                                 cachePolicy: NSURLRequest.CachePolicy.useProtocolCachePolicy,
                                 timeoutInterval: 10.0
        )
        self.webView.load(request)
        
    }
    
    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }
    
    // MARK: - WKScriptMessageHandler
    
    func userContentController(_ userContentController: WKUserContentController, didReceive message: WKScriptMessage) {
        if message.name == "loginAction" {
            print("JavaScript is sending a message \(message.body)")
        }
    }
}
