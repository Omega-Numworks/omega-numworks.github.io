export const releases = {
	"latest": "O1.22.1-E15",
	"firmwares": [{
	    "name": "O1.22.1-E15",
	    "commit": "6f797833b2195a1aeaa9298dcd60dd4cbd006a96",
	    "changelog": [
            "Fix: Setting username in installer now works",
            "Fix: Atomic: Fixed copying data, exceptions in EC and copper and iron in french translation"
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"setname": true,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}, {
	    "name": "O1.22.0-E15",
	    "commit": "58ff19858fad1d86e53fd6162307ee74a438d603",
	    "changelog": [
            "New: Atomic: the periodic table app has been completely rewritten",
            "Update: Colors of the periodic table app has been reworked",
            "New: kmat(x,y,z) function, generates a constant matrix of size x*y containing z",
            "New: Support of ' for derivatives. Writing f(x)' replaces it with diff(f(x), x, x)",
            "New: Key list in the ion module's toolbox have been replaced by a key selector",
            "New: Apps shortcuts, press Shift+7 to go to calculation, Shift+8 to go to RPN, etc",
            "Fix: Rendering issues with external icons",
            "New: Pressing x10^ key adds ans before it on empty text cells",
            "New: Added font size choice in kandinsky.draw_string",
            "Fix: Python now works when building with DEBUG=1",
            "Update: Credits have been updated to include new contributors and new beta testers",
            "Fix: Simulator now transforms CRLF to CR when pasting",
            "Fix: Android JNI Crash is now fixed in the source code",
            "Fix: Fixed simulator argument detection"
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"setname": false,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}, {
	    "name": "O1.21.0-E15",
	    "commit": "9eff895a95e17a0d5ad2e4894b37a6ccd4a72301",
	    "changelog": [
			"Update: Epsilon updated to Epsilon 15.3.1!",
			"New: Real-time clock",
			"New: Icon for the Windows and macOS simulators",
			"New: Throw an error when the user is missing apps",
			"Change: Chrome Popup: change URL from workshop.numworks.com to getomega.dev",
			"Change: Doxygen with an Omega theme",
			"Change: Merge omega-themes submodule in the main repository",
			"Change: Improved Spanish translations",
			"Fix: Fixed append implementation",
			"Fix: homescreen selection with uncompleted row",
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"setname": false,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}, {
	    "name": "O1.20.3-E14",
	    "commit": "46658f7077045b28906e257f544414e41f62381a",
	    "changelog": [
			"Change: Constants based on the CODATA 2018",
			"Change: Visual keyboard only change state on keydown",
			"Change: USERNAME to OMEGA_USERNAME",
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"setname": false,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}, {
	    "name": "O1.20.2-E14",
	    "commit": "0235de80101785c6dedf0b7f4651584cfd56cbad",
	    "changelog": [
			"New: Persistent Simulator storage",
			"New: Document os",
			"Change: Clean useless files in os",
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"setname": false,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}, {
	    "name": "O1.20.1-E14",
	    "commit": "4af76cc3ae3798cfb3e85c4106ca1006262f32e1",
	    "changelog": [
			"New: Python os module (uname, listdir, remove, rename)",
			"Fix: Crash on append on new file",
			"Change: Color of fractal in mandelbrot.py",
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"setname": false,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}, {
	    "name": "O1.20.0-E14",
	    "commit": "132f89923733e11b1b3ac70b5867419b355c0ea5",
	    "changelog": [
			"Update: Updated to Epsilon 14.4.1!",
			"New: Added 67 constants",
			"New: New units",
			"New: 3DS Simulator",
			"New: External apps are now displayed on the home screen",
			"New: Python: open function (and derivatives)",
			"New: Physics constants are now using the Epsilon units",
			"New: Added message when the compilation starts",
			"New: Undef is hidden during symbolic calculation",
			"New: Display the scripts size",
			"New: Community themes: Download a community theme with THEME_REPO=git-url and THEME_NAME=theme_name.",
			"New: Shift + Home is now a shortcut to go to calculation (or the first app)",
			"New: Support for RGB files without alpha channel.",
			"New: Add root and log settings",
			"New: \\ shortcut (with ALPHA+x10^x)",
			"New: @ shortcut (with ALPHA+ANS)",
			"New: µ shortcut (with SHIFT+7)",
			"New: Ω shortcut (with SHIFT+9)",
			"New: Docker!",
			"New: Web simulator background",
			"Change: Simulators are renamed (Epsilon -> Omega)",
			"Fix: ALPHA lock+arrow",
	    ],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": true
		},
		"available": true,
		"setname": false,
		"langages": {
		    "0100": [
		        "en", "fr", "nl", "pt", "it", "de", "es", "hu"
		    ]
		}
	}, {
		"name": "O1.19.2-E13",
		"commit": "651abf9c7bb0018267729dd13b1cc5c1185b6203",
		"changelog": [
			"Update: Update Epsilon(especially 'Fix input(), that did not return the input' and 'mathplotlib')",
			"Fix: Some problems with the Compact Display"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.19.1-E13",
		"commit": "95095423cd23aea421307076aee1f053ea2b029b",
		"changelog": [
			"Update: Update Epsilon (especially `Fix input(), that did not return the input` and `Allow interruption of infinite print loops`)",
			"Change: Free 1776 bytes of heap",
			"Change: Disable the LED choice",
			"Change: In the Python app, `alpha+up` leads to the beginning of the script and `alpha+down` allows you to jump to the end. Same for `alpha+left` and `alpha+right`. Before, it was with the `shift` key, but it's now used to select the text.",
			"Fix: Some problems with the Compact Display",
			"Fix: Some Hungarian translations",
			"Fix: Allow simulator to be loaded with multiple scripts."
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.19.0-E13",
		"commit": "dcaa1cb46dafbd40b13e46b1954c9b2c79b60d48",
		"changelog": [
			"New: Omega Icons!",
			"New: Hungarian language!",
			"New: Compact display in the calculation app",
			"New: In the Python app, there is a new option to duplicate a script",
			"New: Red, purple and orange color choices for the LED",
			"New: Url to install apps + infos about External available in the app",
			"New: In the Python app, shift+up leads to the beginning of the script and shift+down allows you to jump to the end.",
			"New: RAM usage in the settings",
			"New: External is removed of n0100 and the web simulator.",
			"New: Code-side system to check if an app is available in a specific exam mode (NoExaminationLevel, BasicExaminationLevel and StrictExaminationLevel)",
			"New: Beta testers added in the contributors list",
			"Change: Removed static buffers",
			"Change: The exam mode icon is now better positioned.",
			"Fix: With get_keys() 2 keys were inverted (right and up)",
			"Fix: The input field of the RPN app now reflects the style of the calculation app",
			"Fix: Apps dependency in ion",
			"Fix: The sign of *10^",
			"Fix: Remove static buffers",
			"Fix: \"Activate exam mode\" button stayed highlighted",
			"Fix: The Onboarding logo is now better",
			"Fix: Shift + ÷ displays \"%\" instead of nothing",
			"Fix: In French, the description of \"monotonic function\" is fixed",
			"Fix: Some problems with alpha(lock)+backspace"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.18.5-E12",
		"commit": "8ed907b35626856144038d0a52ead3398037cedf",
		"changelog": [
			"Fix: Added back red LED color"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.18.4-E12",
		"commit": "473c3e878cb06c84d59f6bee8ce3def99c49946b",
		"changelog": [
			"Fix: Crash with e^(i*pi)"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.18.3-E12",
		"commit": "174786786a9057c5568a0037b0ac519a8a192c55",
		"changelog": [
			"Fix: Shift + \"-\" no longer writes \"\\\""
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.18.2-E12",
		"commit": "17f394711038e9f462458577f0fd8936cabd45af",
		"changelog": [
			"Fix: All contributors were not shown"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.18.1-E12",
		"commit": "07765162733aa113d10ddd7a38d011fed7b10778",
		"changelog": [
			"Change: External is now disabled in NoSym exam mode, to disable KhiCAS."
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.18.0-E12",
		"commit": "f93dc07149d23b027a5d63e0fc6a5bf6f3823e81",
		"changelog": [
			"New: Theming engine with a Dark Theme of Omega 😱 Usage: ´OMEGA_THEME=name_of_the_theme´",
			"New: MicroPython version is now displayed in the settings",
			"New: shift + \"+/-\" increase/decrease the brightness",
			"New: shift + \"(\" writes \"()\"",
			"New: Exam mode: you can now choose between 3 modes: \"standard\", \"no symbolic\" and \"Dutch\"",
			"New: Symbolic calculation indicator displayed in the toolbar",
			"New: Keep backspace operation in alpha lock mode",
			"New: External app (v2) ; allows you to install GIAC and Nofrendo from https://zardam.github.io/nw-external-apps/",
			"New: Various improvements to the build system",
			"New: The contributors usernames (@...) are now displayed",
			"New: Doxygen added (to document the source code)",
			"New: Some labels are fixed in the settings. They were too long",
			"Change: Convert symbol_controller into preferences_controller",
			"Change: Reorganized storage",
			"Fix: Colors of the exam mode logo are fixed"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.17.2-E12",
		"commit": "eac98f3b0578daa5953ed38e64f2a1c0f69f3e3d",
		"changelog": [
			"Fixed colors of the exam mode popup"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.17.1-E12",
		"commit": "5d0cd1d3892a31975bdf6d2488f09afb364156f4",
		"changelog": [
			"Fixed an issue with the multiplication symbol"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.17.0-E12",
		"commit": "2b0b3d6724b0f8db752ea495fd8630e826fc6d3d",
		"changelog": [
			"New: The palette is now larger to allow very customizable themes",
			"New: Omega Light theme (installed by default)",
			"Change: More user-friendly settings for the multiplication sign",
			"Fix: RPN app"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.16.2-E12",
		"commit": "b61d6ddcb17e0d1e635fbac459ecc1b4c1270cff",
		"changelog": [
			"Fix: Math options > Result format crash"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.16.1-E12",
		"commit": "d9fcc1dcba187320b3387ec7fa102dbd2bb7413a",
		"changelog": [
			"Fix: Hardware test shortcut position in the settings"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.16.0-E12",
		"commit": "48ae1b084c678f63729dedd0ca6b92094316ceb2",
		"changelog": [
			"New: Add the ability to change the multiplication sign"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.15.6-E12",
		"commit": "e1d60b2fcad571048eaaaa0dd0b3a8e424865cf7",
		"changelog": [
			"Change: Reordered settings"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.15.5-E12",
		"commit": "33d0c11aa60dcfc224e13b6f89b30973af89382c",
		"changelog": [
			"Update: Updated Epsilon"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.15.4-E12",
		"commit": "6fd20fdbfd7de18dfc0cd2ab9ab054f2365372f4",
		"changelog": [
			"Update: Updated Epsilon"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.15.3-E12",
		"commit": "06b0fd79e0942cfc109449033758c7805cbec2ae",
		"changelog": [
			"Update: Atom"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.15.2-E12",
		"commit": "72d28e50f46540448101fb91dca839ab2b6a1113",
		"changelog": [
			"Fix: Make binpack target work, changed logo"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.15.1-E12",
		"commit": "8f2476383a9d584aababf0b3f4b9970628312f80",
		"changelog": [
			"Update: Updated Atom"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.15.0-E12",
		"commit": "aa1eae026a6aac9c50bdf01d69b79b4f2d6255e3",
		"changelog": [
			"Fix: You can now compile the simulator"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.14.0-E12",
		"commit": "12a3dd6237aa56a7602585081d9f3c15bda35c0f",
		"changelog": [
			"Change: Massive refactor of settings"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.13.10-E12",
		"commit": "4c1f6b16c98d4853bc1450f14cd28f8385a73224",
		"changelog": [
			"Fix: Workshop crash"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.13.9-E12",
		"commit": "cb54f97b508a76729a32dfebe90be2d64be02525",
		"changelog": [
			"New: 3 new constants (physics)"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.13.8-E12",
		"commit": "4f2835b3abae27488828c3533a3ca4e63e1db681",
		"changelog": [
			"Update: Updated Atom"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.13.7-E12",
		"commit": "715b7a1b28630be434cc2a9b4ab689b140cee3e3",
		"changelog": [
			"Fix: Multiplication symbols in toolbox"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.13.6-E12",
		"commit": "39df5da91d1b54dc9919bf6664bb32c02ccfba78",
		"changelog": [
			"Fix: Spaces in username"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.13.5-E12",
		"commit": "95f293792298c6270a0099954b09c35ddd7a8b07",
		"changelog": [
			"Change: Remove username row if N/A"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.13.4-E12",
		"commit": "15bc1bb46d6d3e08f5bb7c284623f2e8c151176b",
		"changelog": [
			"New: Add username in the settings"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.13.3-E12",
		"commit": "bb50c01d8fc2de2e7c4b3af2d60dec68e3105bd2",
		"changelog": [
			"New: Add command-line arguments support"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.13.2-E12",
		"commit": "20da71a8f4db98f31ea084b95cca825664f5896c",
		"changelog": [
			"New: Module time in toolbox"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.13.1-E12",
		"commit": "aa88764669e244b85039e88f5d1f4684d45d8c03",
		"changelog": [
			"Fix: Accessibility translations"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.13.0-E12",
		"commit": "4a8d707a0747e0332fb6f5c04256635d18190197",
		"changelog": [
			"New: Accessibility settings"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.12.3-E12",
		"commit": "d208cf4611a0ea8fb9db31859ccd478c404676a3",
		"changelog": [
			"Updated: Update contributors"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.12.2-E12",
		"commit": "f7ff6bf8862e15374492be372e154b48661f3cac",
		"changelog": [
			"Fix: Warnings during compilation"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.12.1-E12",
		"commit": "013787fa715dcfd86c5150a675bc363129f01f3b",
		"changelog": [
			"New: get_keys() on Python!"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.12.0-E12",
		"commit": "f58c1cba48fd83589f158956d72f31a826dd1214",
		"changelog": [
			"New: A periodic table app"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.11.0-E12",
		"commit": "8526bfae76d32fd1ba6a132a826d87580b07fa5e",
		"changelog": [
			"New: Physics constants"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.10.4-E12",
		"commit": "c3db422358ce9ab8ba2591b6f5a358bef9a5e4c8",
		"changelog": [
			"Fix: Child display in settings"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.10.3-E12",
		"commit": "46e7860511ef7c352ca2cb39be2f9fc20096008b",
		"changelog": [
			"New: 32 KB Python heap instead of a 16 KB"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.10.2-E12",
		"commit": "876e44a0c74e00018f2037010f6eb837bdbedd8b",
		"changelog": [
			"Fix: Contributors duplication (code side)"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.10.1-E12",
		"commit": "e60cc8405a01380fa7157aba239b7d151eeb1e6a",
		"changelog": [
			"Update: Updated contributors"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.10.0-E12",
		"commit": "d437bbeea3c64fb9e5504f34a7249e3d0ce0eda6",
		"changelog": [
			"New: RPN app"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.9.1-E12",
		"commit": "efb39b756f74cd6719c8c826684b6e9edbbf4aee",
		"changelog": [
			"Fix: Chemical constants duplication (code side)"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": false,
			"android": true,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.9.0-E12",
		"commit": "9b3c1eb23e043170b16af08501ff13afa710a7c0",
		"changelog": [
			"Update: Updated to Epsilon 12"
		],
		"compatibility": {
			"N0110": true,
			"N0100": true,
			"web": true,
			"android": true,
			"3ds": false
		},
		"available": false,
		"setname": false
	}, {
		"name": "O1.8.2-E11",
		"commit": "789daeac51aca69f69f3e1fad0f03c38e7e10855",
		"changelog": [
			"Fix: German translations"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.8.1-E11",
		"commit": "9351109f6256ca5cc58130c6ee06660510185b25",
		"changelog": [
			"Update: Update contributors"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.8.0-E12",
		"commit": "3ca830ff55dc25a1cc69273b5699d2d718810793",
		"changelog": [
			"Change: Lava OS becomes Omega!"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.7.0-E11",
		"commit": "3f10de952190c054053ee85d64ae52b8fc40d164",
		"changelog": [
			"New: Lava OS Contributors in settings"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.6.0-E11",
		"commit": "e83e168a9485575eeb1d5a48055ab8dfb430d0fe",
		"changelog": [
			"New: Lava OS version tag (public/dev) in settings > about"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.5.0-E11",
		"commit": "9f146fec9ceb3e69a7d4d6ccdfd8c5303255904d",
		"changelog": [
			"New: Settings to change the led color in the settings (white/green/blue/yellow)"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.4.0-E11",
		"commit": "f99012e6f710d20b82febac4ef0bf8b4e95a7e1e",
		"changelog": [
			"New: Chemistry constants sorted by atomic number or in alphabetical order (120 molar masses!)"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.3.0-E11",
		"commit": "b36b7e372b36e6e3763807cce000d0cf6b4f7ba7",
		"changelog": [
			"New: Increase Brightness steps (from 5 to 16)"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.2.0-E11",
		"commit": "e589e9c72aeea39291c2c7b758a522158c06771b",
		"changelog": [
			"New: 'Lava OS' instead of 'APPLICATIONS' at the top of the home screen"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.1.0-E11",
		"commit": "fe8461c3aad29011a63aee7207d1435e8a53bd75",
		"changelog": [
			"New: Blue Led in exam mode. Now, teachers can know when a student uses LavaOS"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}, {
		"name": "O1.0.0-E11",
		"commit": "f2a1b1253d6f7c622bb88c7b375f056966cc3402",
		"changelog": [
			"New: Symbolic Calculation",
			"New: Lava OS version in settings > about"
		],
		"compatibility": {
			"N0110": false,
			"N0100": true,
			"web": true,
			"android": false,
			"3ds": false
		},
		"available": true,
		"setname": false
	}]
}
