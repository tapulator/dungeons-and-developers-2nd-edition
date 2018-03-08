// Konami code plugin
(function ($) {

    $.fn.konami = function (callback, code) {
        if (code == undefined) code = "38,38,40,40,37,39,37,39,66,65"; //Super secret!

        return this.each(function () {
            var kkeys = [];
            $(this).keydown(function (e) {
                kkeys.push(e.keyCode);
                if (kkeys.toString().indexOf(code) >= 0) {
                    $(this).unbind('keydown', arguments.callee);
                    callback(e);
                }
            });
        });
    }

})(jQuery);

// Custom closure
(function($, ko, data){

	// IE checks
	function getInternetExplorerVersion() {
	    var rv = -1; // Return value assumes failure.
	    if (navigator.appName == 'Microsoft Internet Explorer') {
	        var ua = navigator.userAgent;
	        var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
	        if (re.exec(ua) != null)
	            rv = parseFloat(RegExp.$1);
	    }
	    return rv;
	}
	function isInvalidIEVersion() {
		var ver = getInternetExplorerVersion();
		if (ver > -1 && ver < 9) {
			$('html').addClass("ltIE9");
			return true;
		}
		return false;
	}

	// On page load
	$(function(){

		//Quit if using an IE we don't like
		if (isInvalidIEVersion()) return;

		//Create and bind the viewmodel
		var vm = new tft.skilltree.Calculator(data);
		ko.applyBindings(vm);

		//apply konami code plugin
		$(window).konami(function () { vm.open(); vm.godMode(); });

		//Allow a split second for binding before turning on animated transitions for the UI
		setTimeout(function(){
			$('.page').addClass('animated');
		}, 50);
	});


})(window.jQuery, window.ko, {
	learnTemplate: 'Learn {n} to unlock.',
	portraitPathTemplate: 'img/portraits/portrait-{n}.jpg', 
	numPortraits: 22, 
	defaultStats: {
		'Charisma': 9
		, 'Dexterity': 9
		, 'Fortitude': 9
		, 'Intellect': 9
		, 'Strength': 9
		, 'Wisdom': 9
	},
	skills: [
    {
      "id": 1,
      "title": "HTML",
      "description": "The Internet consists mainly of text documents sent from a server to the browser. The Hypertext Markup Language (HTML) is used to structure these documents, e.g. into title, paragraphs, lists, etc.",
      "rankDescriptions": [
        "You know how to create a basic HTML 5 compliant web page and build links to other pages.",
        "You are able to structure complex content and embed different element types."
      ],
	  /*
      "links": [
        {
          "label": "blah",
          "url": "blah"
        }
      ],
	  */
	  /*
      "books": [
        {
          "label": "blah",
          "url": "blah"
        }
      ],
	  */
      "maxPoints": 2,
      "stats": [
        {
          "title": "Intelligence",
          "value": 1
        },
        {
          "title": "Charisma",
          "value": 1
        },
        {
          "title": "Strength",
          "value": 1
        }
      ]
    },
    {
      "id": 2,
      "title": "CSS",
      "dependsOn": [
        1
      ],
      "maxPoints": 2,
      "stats": [
        {
          "title": "Charisma",
          "value": 3
        }
      ],
      "rankDescriptions": [
        "You are familiar with the basics of CSS formatting and the box model.",
        "You know responsive design techniques, enabling you to adapt layouts to different screen sizes."
      ],
      "description": "Cascading Style Sheets (CSS) control the visuals of web page elements (position, size, etc.) with pixel-accuracy. They also allow some interaction design, e.g. simple animations.",
	  /*
      "talents": [
        "Stylish"
      ]
	  */
    },
    {
      "id": 3,
      "title": "CSS Tools",
      "dependsOn": [
        2
      ],
      "maxPoints": 2,
      "rankDescriptions": [
        "You use variables and nesting to avoid style declaration duplications.",
        "You apply advanced techniques like mix-ins, and write your own if need may be."
      ],
      "description": "Adding CSS preprocessors like LESS and SASS to your toolchain helps you write more structured and efficient CSS using features like variables, functions, and nesting.",
      "stats": [
        {
          "title": "Charisma",
          "value": 2
        },
        {
          "title": "Dexterity",
          "value": 1
        }
      ]
    },
    {
      "id": 4,
      "title": "Web Design Mastery",
      "dependsOn": [
        2
      ],
      "description": "You can transform designs into HTML and CSS.",
      "stats": [
        {
          "title": "Charisma",
          "value": 10
        }
      ]
    },
    {
      "id": 5,
      "title": "RIA Tools",
      "dependsOn": [
        4
      ],
      "maxPoints": 3,
      "rankDescriptions": [
        "You use libraries like jQuery UI or Bootstrap to flesh out prototype interfaces.",
        "You implement your view layer with UI frameworks like React or Vue.",
        "You master state management with the Redux pattern."
      ],
      "description": "Rich Interface Applications (RIAs) represent complex processes offering many elements the user may interact with. RIA tools help you to build those rich interfaces faster.",
	  /*
      "talents": [
        "Sizzlin"
      ],
	  */
      "stats": [
        {
          "title": "Charisma",
          "value": 2
        },
        {
          "title": "Dexterity",
          "value": 1
        }
      ]
    },
    {
      "id": 6,
      "title": "SEO",
      "dependsOn": [
        1
      ],
      "description": "Search Engine Optimization (SEO) may yield high rankings in the natural (not ad-sponsored) results of search engines. Although SEO is heavily content-driven, also technical requirements have to be met.",
      "stats": [
        {
          "title": "Intelligence",
          "value": 2
        },
        {
          "title": "Wisdom",
          "value": 1
        }
      ]
    },
    {
      "id": 7,
      "title": "Analytics",
      "dependsOn": [
        6
      ],
      "description": "One needs to integrate analytic tools into a website to reason about its performance and the success of measures taken (e.g. SEO). To get insightful data some (anonymized) user tracking may be important.",
      "stats": [
        {
          "title": "Intelligence",
          "value": 1
        },
        {
          "title": "Wisdom",
          "value": 2
        }
      ],
	  /*
      "talents": [
        "Cunning"
      ]
	  */
    },
    {
      "id": 8,
      "title": "JavaScript (client-side)",
      "dependsOn": [
        1
      ],
      "maxPoints": 3,
      "rankDescriptions": [
        "You are familiar with the basic JavaScript syntax and DOM manipulation.",
        "You know concepts like closures, anonymous functions, callbacks, and IIFE.",
        "You use ES 6 features, e.g. arrow functions, variable scope, and destructuring."
      ],
      "description": "JavaScript (JS) is the dominant language for client-side programming since its interpreter is part of almost every browser. JS is widely used to add dynamic functionality to HTML pages or build whole Single Page Applications (SPAs).",
      "stats": [
        {
          "title": "Dexterity",
          "value": 3
        }
      ]
    },
    {
      "id": 9,
      "title": "JavaScript Tools",
      "dependsOn": [
        8
      ],
      "maxPoints": 2,
      "rankDescriptions": [
        "You put easy use to libraries like jQuery, Underscore, Knockout, etc.",
        "You are skilled in the application of frameworks like Angular, Ember, or Backbone."
      ],
      "description": "You will find a very large number of JavaScript libraries and frameworks that may speed up your development - ranging from single purpose libraries (e.g. form field validation) to enterprise level frameworks (e.g. ExtJS).",
      "stats": [
        {
          "title": "Dexterity",
          "value": 2
        },
        {
          "title": "Wisdom",
          "value": 1
        }
      ],
	  /*
      "talents": [
        "Nimble"
      ]
	  */
    },
    {
      "id": 10,
      "title": "Client-side Development Mastery",
	  "description": "You know how to transform static documents into interactive experiences.",
      "dependsOn": [
        9
      ],
      "stats": [
        {
          "title": "Dexterity",
          "value": 10
        }
      ]
    },
    {
      "id": 11,
      "title": "Server-side Programming",
      "dependsOn": [
        1
      ],
      "description": "You write programms that execute on the web server. As a back-end developer your code rather interacts with machines (other systems or sub-systems) than users (user input).",
      "stats": [
        {
          "title": "Strength",
          "value": 3
        }
      ]
    },
    {
      "id": 12,
      "title": "Server-side Frameworks",
      "dependsOn": [
        11
      ],
      "description": "These frameworks help to reduce the workload in back-end development by taking away common tasks or abstracting low level details, e.g. by providing database interfaces or session management helpers.",
      "stats": [
        {
          "title": "Strength",
          "value": 2
        },
        {
          "title": "Wisdom",
          "value": 1
        }
      ],
	  /*
      "talents": [
        "Beefcake"
      ]
	  */
    },
    {
      "id": 13,
      "title": "Database Management",
      "maxPoints": 2,
      "rankDescriptions": [
        "You know how to setup tables and choose appropriate field types.",
        "You understand how relational databases organize data."
      ],
      "description": "A database is basically a data store. What makes them special in contrast to file storage is their fast operation on huge datasets. The most widely used database language is Structured Query Language (SQL).",
      "stats": [
        {
          "title": "Strength",
          "value": 3
        }
      ]
    },
    {
      "id": 14,
      "title": "Advanced Database Management",
      "dependsOn": [
        13
      ],
      "maxPoints": 2,
      "rankDescriptions": [
        "You know how to use stored procedures and custom functions to make queries more efficient.",
        "You can detect the source of performance deficiencies and resolve them."
      ],
      "description": "In addition to basic tables and relational data, databases offer the ability to store procedures (predefined SQL statements) and also support user-defined functions (UDFs).",
      "stats": [
        {
          "title": "Strength",
          "value": 2
        },
        {
          "title": "Dexterity",
          "value": 1
        }
      ],
	  /*
      "talents": [
        "XXL backpack"
      ]
	  */
    },
    {
      "id": 15,
      "title": "Server-side Development Mastery",
      "dependsOn": [
        12,
        14
      ],
      "description": "You have the ability to design and build an application's backend that efficiently operates on data.",
      "stats": [
        {
          "title": "Strength",
          "value": 10
        }
      ]
    },
    {
      "id": 16,
      "title": "User Authentication & Authorization",
      "dependsOn": [
        15
      ],
      "description": "The process of authentication is to determine who someone (or what something) is. Authorization is the process to allow a user to perform an action or to access a resource.",
      "stats": [
        {
          "title": "Fortitude",
          "value": 5
        }
      ],
	  /*
      "talents": [
        "Truthseeker"
      ]
	  */
    },
    {
      "id": 17,
      "title": "APIs & AJAX",
      "dependsOn": [
        10,
        15
      ],
      "description": "Application Programming Interfaces (APIs) provide applications and developers access to a predefined set of routines inside a \"black box\" (a system which's inner working is unknown to a third party).<br>Asynchronous JavaScript and XML (AJAX) enables web pages to partly update by exchanging small amounts of data with the server in the background superseding page reloads - and introducing cursed infinite scroll.",
      "stats": [
        {
          "title": "Strength",
          "value": 1
        },
        {
          "title": "Dexterity",
          "value": 1
        },
        {
          "title": "Intelligence",
          "value": 1
        }
      ],
	  /*
      "talents": [
        "Mindweaver"
      ]
	  */
    },
    {
      "id": 18,
      "title": "User Discovery",
      "maxPoints": 2,
      "rankDescriptions": [
        "You know what questions to ask and use sketches if necessary to clarify your thoughts.",
        "You use advanced tools, like experience mapping, to guide the dialogue with stakeholders."
      ],
      "description": "Identification of the customer's and user's needs before starting to design anything. It's straightforward: You need to know what to build in order to build something convenient.",
      "stats": [
        {
          "title": "Wisdom",
          "value": 2
        },
        {
          "title": "Charisma",
          "value": 1
        }
      ],
	  /*
      "talents": [
        "Mindreader"
      ]
	  */
    },
    {
      "id": 19,
      "title": "Graphic Design",
      "maxPoints": 2,
      "rankDescriptions": [
        "You can create a balanced, complementary layout that delivers a clear message.",
        "You learned how to create a compelling, unique design that doesn't compromise usability."
      ],
      "dependsOn": [
        18
      ],
      "description": "Graphic design communicates messages by creating aesthetically pleasing and easy to understand visuals: well balanced compositions of colors, typography, symbols, pictures, and whitespace.",
      "stats": [
        {
          "title": "Charisma",
          "value": 3
        }
      ],
	  /*
      "talents": [
        "Artist"
      ]
	  */
    },
    {
      "id": 20,
      "title": "Graphic Design Tools",
      "dependsOn": [
        19
      ],
      "description": "You know the ins and outs of power-user graphic design software like Photoshop to create beautiful visuals which some may even consider art. Plus: You retouch assets for a professional finish.",
      "stats": [
        {
          "title": "Charisma",
          "value": 2
        },
        {
          "title": "Intelligence",
          "value": 1
        }
      ]
    },
    {
      "id": 21,
      "title": "Prototyping",
      "dependsOn": [
        18
      ],
      "description": "Prototypes are approximations of the yet to be product. They mock complex functionality and are thereby a cheap way to test ideas and unveil unanticipated problems before going into expensive production.",
      "stats": [
        {
          "title": "Wisdom",
          "value": 1
        },
        {
          "title": "Intelligence",
          "value": 2
        }
      ],
	  /*
      "talents": [
        "Conjurer"
      ]
	  */
    },
    {
      "id": 22,
      "title": "User Experience Design Mastery",
      "dependsOn": [
        19,
        21
      ],
      "description": "Turning the project requirements into an attractive design that promotes a pleasant user experience.",
      "stats": [
        {
          "title": "Wisdom",
          "value": 1
        },
        {
          "title": "Charisma",
          "value": 2
        }
      ]
    },
    {
      "id": 23,
      "title": "User Testing",
      "dependsOn": [
        22
      ],
      "description": "Methods to acquire and evaluate the feedback of target users who test your website. Indispensable to check if your design also works for somebody else, not just you or your team.",
      "stats": [
        {
          "title": "Charisma",
          "value": 1
        },
        {
          "title": "Wisdom",
          "value": 2
        }
      ],
	  /*
      "talents": [
        "Alchemist"
      ]
	  */
    },
    {
      "id": 24,
      "title": "Server Administration",
      "maxPoints": 2,
      "rankDescriptions": [
        "You adjust your server's environment to your application's requirements.",
        "You are familiar with your server's modules, e.g. to rewrite URLs."
      ],
      "description": "Even the smallest web app needs some infrastructure - unless you go serverless. Some web servers may require certain configuration to operate smoothly with the back-end language(s) of your choice.",
      "stats": [
        {
          "title": "Fortitude",
          "value": 3
        }
      ],
	  /*
      "talents": [
        "Regulator"
      ]
	  */
    },
    {
      "id": 25,
      "title": "Deployment",
      "dependsOn": [
        24
      ],
      "maxPoints": 3,
      "rankDescriptions": [
        "You minify files and activate data compression to increase your website's performance.",
        "You secure sensitive traffic via HTTPS using SSL certificates.",
		"You master Continuous Deployment using virtualization tools like Docker."
      ],
      "description": "The administration of your application's stage progression (development > testing > acceptance > production). Automation is used where suitable to go live with new iterations in short time.",
      "stats": [
        {
          "title": "Fortitude",
          "value": 2
        },
        {
          "title": "Dexterity",
          "value": 1
        }
      ],
	  /*
      "talents": [
        "Spectrum Guide"
      ]
	  */
    },
    {
      "id": 26,
      "title": "Web Development Mastery",
      "dependsOn": [
        4,
        5,
        10,
        15,
        22,
        25
      ],
      "description": "You are a true master of web development combining skills in design, implementation and maintenance!",
      "stats": [
        {
          "title": "Charisma",
          "value": 3
        },
        {
          "title": "Dexterity",
          "value": 3
        },
        {
          "title": "Fortitude",
          "value": 3
        },
        {
          "title": "Intelligence",
          "value": 3
        },
        {
          "title": "Strength",
          "value": 3
        },
        {
          "title": "Wisdom",
          "value": 3
        }
      ],
	  /*
      "talents": [
        "Demigod"
      ]
	  */
    }
  ]
});