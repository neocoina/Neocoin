// Shop list numbers for displaying shops list
var shopsList = {
  1: 'Food Shop',
  2: 'Magical Shop',
  3: 'Toy Shop',
  4: 'Clothes Shop',
  5: 'Grooming Shop',
  7: 'Book Shop',
  8: 'Collectable Card Shop',
  9: 'Battle Magic Shop',
  10: 'Defense Magic Shop',
  12: 'Garden Centre',
  13: 'Neopian Pharmacy',
  14: 'Chocolate Factory',
  15: 'Bakery',
  16: 'Healtly Food',
  17: 'Neopian Gift Shop',
  18: 'Smoothie Store',
  20: 'Tropical Food',
  21: 'Tiki Tack',
  22: 'Grundos',
  23: 'Space Weaponry',
  24: 'Space Armour',
  25: 'Neopian Petpet Shop',
  26: 'Robopet Shop',
  27: 'Rock Pool',
  30: 'Spooky Food',
  31: 'Spooky Pets',
  34: 'Ye Olde Coffee Shop',
  35: 'Slushie Shop',
  36: 'Ice Crystal Shop',
  37: 'Icy Fun Snow Shop',
  38: 'Faerieland bookshop',
  39: 'Faerie Food',
  40: 'Faerieland Petpets',
  41: 'Neopian Furniture',
  42: 'Tyrannian Food',
  43: 'Tyrannian Furniture',
  44: 'Tyrannian Petpets',
  45: 'Tyrannian Weaponry',
  46: 'Hubert\'s Hot Dog',
  47: 'Pizzaroo',
  48: 'Usuki Land',
  49: 'Food of the Lost Desert',
  50: 'Peopatra\'s Pet Pets',
  51: 'Sutek\'s Scrolls',
  53: 'Back to School Shop',
  54: 'Battle Supplies',
  55: 'Osiri\'s Pottery',
  56: 'Merifoods',
  57: 'Ye Olde Petpets',
  58: 'Neopian Post Office Kiosk',
  59: 'Haunted Weaponry',
  60: 'Spooky Furniture',
  61: 'Wintery Petpet',
  62: 'Jelly Food',
  63: 'Refreshments',
  66: 'Kiko Lake Treats',
  67: 'Kik0 Lake Carpentry',
  68: 'Collectable Coins',
  69: 'Petpet Supplies',
  70: 'Booktastic Books',
  71: 'Kreludan Homes',
  72: 'Cafe Kreludor',
  73: 'Kayla\'s Potion Shop',
  74: 'Darigan Toys',
  75: 'Faerie Furniture',
  76: 'Roo Island Marchandise Shop',
  77: 'Brightval Books',
  78: 'The Scrollery',
  79: 'Brightvale Glaziers',
  80: 'Brightvale Armoury',
  81: 'Brightvale Fruits',
  82: 'Brightvale Motery',
  83: 'Royal Potionery',
  84: 'Neopian Music Shop',
  85: 'Lost Desert Medicine',
  86: 'Collectable Sea Shells',
  87: 'Maractite Marvels',
  88: 'Maraquan Petpet',
  89: 'Geraptiku Petpets',
  90: 'Qasalan Delights',
  91: 'Desert Arms',
  92: 'Words of Antiquity',
  93: 'Faerie Weapon Shop',
  94: 'Illustrious Armoury',
  95: 'Exquisite Ambrosia',
  96: 'Magical Marvels',
  97: 'Legendary Petpets',
  98: 'Plushie Palace',
  99: 'Altador Cup Souvenirs',
  100: 'Wonderous Weaponry',
  101: 'Exotic Foods',
  102: 'Remarkable Restoratives',
  103: 'Fanciful Fauna',
  104: 'Chesterdrawers\' Antiques',
  105: 'The Crumpetmonger',
  106: 'Neovian Printing Press',
  107: 'Prigpants & Swolthy, Tailors',
  108: 'Mystical Surroundings',
  109: 'Petpetpet Habitat',
  110: 'Lampwyck\'s Lights Fantastic',
  111: 'Cog\'s Togs',
  112: 'Molten Morsels',
  113: 'Moltaran Petpets', 
  114: 'Moltaran Books'
}

// Callback function array for the qyery param ?nac=[method] call 
// ?nac=  list
var autoList = {
  // Move to bank
  mtb: function (){
    window.location = 'http://www.neopets.com/bank.phtml?nac=mgb';
    throw new Error("Break here");
  },
  // Manage bank - Deposit or withdraw
  mgb: function () {
    console.log('mgb');
    
    // Set NAC for this page
    var item = {
      nac: {
        '/bank.phtml': 'mgb'
      }
    }; 
    
    // Find out if we widthdraw of deposit
    var amount = getMinimumNeopoints();
    if (amount == 0 ){
      
      var item = {
        nac: {
          '/bank.phtml': ''
        }
      };
      // Set the NP to storage    
      setStorage(item);
      closeWindow();
     
    }
    else if (amount > 0 ){
      // Deposit amount
      var $submit = $('input[value="Deposit"]');
      var $amountInput = $submit.siblings('input[type="text"]');
      // Set the NP to storage
      setStorage(item);
    }
    else {
      // Withdraw amount
      // Make it positive for the withdraw
      amount = (amount *-1) + getStorage()['npExtra'];
      var $submit = $('input[value="Withdraw"]');
      var $amountInput = $submit.siblings('input[type="text"]');
      // Set the NP to storage
      setStorage(item);   
    }
    // Set amount
    $amountInput.val(amount);
    // Remove the confirmation boxs
    $('form').attr('onsubmit','');
    $submit.click();
  },
  
  // OLD Re auto stock
  ras: function() {
    var storage = getStorage();
    
    if (storage['autoBool'] === true ) {
      // Get random timeout between min & max settings
      timeout =  Math.floor( Math.random() * ( storage['refreshTimeoutMax'] -  storage['refreshTimeoutMin'] + 1 ) ) + storage['refreshTimeoutMin'];
          
      console.log('Shop Bot - Auto Refreshing in ' + timeout + ' seconds');
          
      var t = setTimeout(function(){
        // Get new storage in case they changed shop settings during the timeout
        storage = getStorage();
        
        // Get random shop num
        // Build array of available shops
        var shopNum = [];
        for ( var prop in storage['shopsList'] ) {
            if ( storage['shopsList'].hasOwnProperty(prop) ) {
                shopNum.push(prop);
            }
        }
        // Get random
        shopNum = shopNum[Math.floor(shopNum.length * Math.random())];
        // If we don't have shop default to magic
        if (!shopNum ){
          shopNum = 2;
        }
        var shopURL = 'http://neopets.com/objects.phtml?type=shop&obj_type='
        shopURL += shopNum.toString();
        shopURL += '&nac=ras';
        window.location = shopURL;
      }, timeout * 1000);
    }
  },
  
  // Jump to random shops - If it is the correct shop to jump from
  shopRandom: function() {
      // Set NAC for this page
      /*
      var item = {
        nac: {
          '/objects.phtml': 'shopRandom'
        }
      };
      setStorage(item);
        */
      
     
      var storage = getStorage();
      
      if (storage['autoBool'] === true ) {
      
          // If the shope set is the current shop then do stuff!
          if ( storage['shopRandom'] == getParam('obj_type') ) {
          
              // Get random timeout between min & max settings
              timeout =  Math.floor( Math.random() * ( storage['refreshTimeoutMax'] -  storage['refreshTimeoutMin'] + 1 ) ) + storage['refreshTimeoutMin'];
          
              console.log('Shop Bot - Auto Refreshing in ' + timeout + ' seconds');
          
              var t = setTimeout(function(){
                // Get new storage in case they changed shop settings during the timeout
                storage = getStorage();
        
                // Get random shop num
                // Build array of available shops
                var shopNum = [];
                for ( var prop in storage['shopsList'] ) {
                    if ( storage['shopsList'].hasOwnProperty(prop) ) {
                        shopNum.push(prop);
                    }
                }
                // Get random
                shopNum = shopNum[Math.floor(shopNum.length * Math.random())];
                // If we don't have shop default to magic
                if (!shopNum ){
                  shopNum = 2;
                }
                
                // Set shop number (so we only auto on the specific shop)
                var item = { shopRandom: shopNum };
                setStorage(item);
    
                
                var shopURL = 'http://neopets.com/objects.phtml?type=shop&obj_type='
                shopURL += shopNum.toString();
                window.location = shopURL;
              }, timeout * 1000);
          
          
          
          }
          
      }
      
          
     
    
  }
  
  
}

// Inject scripts that need window access
function injectScripts(){
  var s = document.createElement('script');
  s.src = chrome.extension.getURL("script.js");
  s.onload = function() {
      this.parentNode.removeChild(this);
  };
  (document.head||document.documentElement).appendChild(s);
}

// Check if object is empty
function isEmpty(obj){
    return (Object.getOwnPropertyNames(obj).length === 0);
}

// Function to inject our css
function injectStyle (){
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.extension.getURL('css.css');
  document.head.appendChild(style);
}

// Function to create or toggle the neocoin items box
function toggleNeoCoinBar(){
  
  // Get storage
  var storage = getStorage();
  // Item to send to storage - for bind functions
  var item;
  // Quick price active string
  var quickPriceActive = '';
  // Auto Buy active string
  var autoActive = '';
  // Cache var for binds
  var $this;
  // Get the toolbar
  var $neoBar = $('.neocoin-bar');
  
  $neoBar.toggleClass('active');
	if( $neoBar.hasClass('active') ){
    // Create an object for storage
    item = {          
      toolbarBool: true
    };
	}
	else {
    // Create an object for storage
    item = {          
      toolbarBool: false
    };
	}
  setStorage(item);
  
  // See if Neobar is already built
  var $autoBuy = $('.auto-buy');
  if ( $autoBuy.length == 0 ) {
    // Not built - Build neobar
    // Check if Auto Buy is active
    if (storage['autoBool'] === true){
      autoActive = 'active';
    }
    // Check if Quick Price is active
    if (storage['quickPriceBool'] === true){
      quickPriceActive = 'active';
    } 
   
    
    var autoBuySwitch = '<div class="switch ' + autoActive + '">' +
  								    '<span class="switch-label">Auto Buy:</span>' +
                      '<span class="thumb"></span>' +
                      '</div>';
    
               
    var quickPriceSwitch = 	'<div class="switch ' + quickPriceActive + '">' +
  							            '<span class="switch-label">Quick Price:</span>' +
                            '<span class="thumb"></span>' +
                            '</div>';
                            
                       
    
    var shopBotLink = '<a class="shopBotLink" href="http://www.neopets.com/objects.phtml?type=shop&obj_type=2" target="_blank">[ ShopBot ]</a>';
  
    var shopBotTimes = '<input type="text" class="refreshTimeoutMin" value="' + storage['refreshTimeoutMin'] + '"> - </input> ' + 
                        '<input type="text" class="refreshTimeoutMax" value="' + storage['refreshTimeoutMax'] + '"></input> sec.';
  
    // Can append these all at once
    $neoBar.append(
      // Append the auto stocker switch
      '<div class="auto-buy">' + autoBuySwitch + '</div>' +
      // Append the quick price switch
      '<div class="quick-price">' + quickPriceSwitch + '</div>' +
      // Append the shop bot link
      '<div class="shop-bot">'+ shopBotLink + shopBotTimes + '</div>' +
      // Append the Shop List link
      '<div class="shops-list-link"><a href="#">Shops</a></div>' +
      // // Append the Ignore items link
      '<div class="ignore-items-link"><a href="#">Ignore Items</a></div>'
    );
    
    
    // On click set the shop to storage
    $('.shopBotLink').bind('click', function(){
        
        // Set auto for the objects page
        var item = {
          nac: {
            '/objects.phtml': 'shopRandom'
          }
        };
        setStorage(item);
        
        // Set the shop num ( 2 because the link is always to 2 )
        var item = { shopRandom: 2 };
        setStorage(item);
      
    });
  
  	// Bind the auto stock active switch
  	$('.auto-buy .switch').bind('click', function(){
  		$this = $(this);
  		$this.toggleClass('active');
  		if( $this.hasClass('active') ){
        // Create an object for storage
        item = {          
          autoBool: true
        };
  			$this.closest('li').addClass('active');
  		}
  		else {
        // Create an object for storage
        item = {          
          autoBool: false
        };
  			$this.closest('li').removeClass('active');
  		}
      // Set the item to storage
      setStorage(item);   
  	});
        
  	// Bind the quick price active switch
  	$('.quick-price .switch').bind('click', function(){
  		$this = $(this);
  		$this.toggleClass('active');
  		if( $this.hasClass('active') ){
        // Create an object for storage
        item = {          
          quickPriceBool: true
        };
         
  			$this.closest('li').addClass('active');
  		}
  		else {
        // Create an object for storage
        item = {          
          quickPriceBool: false
        };
        
  			$this.closest('li').removeClass('active');
  		}
      // Set the item to storage
      setStorage(item);   
  	});
  
    // Bind the shop bot timeouts
    $('.shop-bot input').bind('keyup', function (){
      // Create an object for storage
      item = {};
      console.log('Setting ' + this.className + ' : ' + this.value );
      item[this.className] = parseInt(this.value);
      // Set the item to storage
      setStorage(item);   
    });
    
    // Bind the shops list
    $('.shops-list-link').bind('click', function(e){
      $(this).toggleClass('active');
      e.preventDefault();
      toggleShopsList();
    });
  
    // Bind the Ignore items list
    $('.ignore-items-link').bind('click', function(e){
      $(this).toggleClass('active');
      e.preventDefault();
      toggleIgnoreBox();
    });
    
    // Check for active tabs and toggle them on if needed
    // Check if Shops List is active
    if (storage['shopsListBool'] === true){
      $('.shops-list-link').addClass('active');
      toggleShopsList();
      console.log('shops should be active');
    }
    // Check if Shops List is active
    if (storage['ignoreBoxBool'] === true){
      $('.ignore-items-link').addClass('active');      
      toggleIgnoreBox();
      console.log('Ignore should be active');
    }
  // End build out of toolbar
  }

}

// Function to create or toggle the shops list
function toggleShopsList(){
  // Item to send to storage in bind    
  var item;
  var $shopsList = $('.shops-list');
  
  if ($shopsList.length !== 0){
    if($shopsList.hasClass('active')){
      // Create an object for storage
      item = {          
        shopsListBool: false
      };
      console.log('Making disabled');
      $shopsList.fadeOut('slow');
      $shopsList.removeClass('active');
    }
    else {
      console.log('Making active');
      // Create an object for storage
      item = {          
        shopsListBool: true
      };
      $shopsList.fadeIn('slow');
      $shopsList.addClass('active');
    }
    setStorage(item);
  }
  else {
    // Get storage
    var storage = getStorage();
    var shopList = '<div class="shops-list"><ul>';
    
    var activeClass;
    // Used for bind
    var $this;
    // Used for shop number in bind
    var shopNum;
    // Create an object for storage
    item = {          
      shopsListBool: true
    };
    
    // Loop all shops
    for (var key in shopsList) {
      if (shopsList.hasOwnProperty(key)) {
        activeClass = ''
        if (storage['shopsList'][key]){
          activeClass = ' class="active"';
        }
      
        //console.log(key+' : '+shopsList[key]);
        shopList += '<li' + activeClass + ' data-num="' + key + '"><span>' + key + ')&nbsp;&nbsp;' + shopsList[key] + '</span></li>';
      }
    }
    shopList += '</ul></div>';
  
    // Append the shop list
    $('.neocoin-bar').append(shopList);
  
    // Bind the li elements
  
    $('.shops-list ul li').bind('click', function(){
      $this = $(this);
      $this.toggleClass('active');
      shopNum = $this.data('num');
  		if( $this.hasClass('active') ){
        // Create an object for storage
        item = {'shopsList':{}};
        console.log('Adding shop to shopping list');
        item['shopsList'][shopNum] = true;
        console.dir(item);
        setStorage(item);
           
  		}
  		else {
        console.log('Deleting shop fron shopping list');
        // Create an object for storage
        item = {'shopsList':{}};
        delete storage['shopsList'][shopNum];
        setNeocoinStorage(storage);
  		}
      // Set the item to storage
    });
    // Call the toggle to show what we just created
    //toggleShopsList();
    console.log('fade in new shops list');
    $('.shops-list').fadeIn('slow');
    toggleShopsList();    
  }
}

// Function to create or toggle the ignore items box
function toggleIgnoreBox(){
  var $ignoreItemsBox = $('.ignore-items-box');
  if ($ignoreItemsBox.length !== 0){
    if($ignoreItemsBox.hasClass('active')){
      // Create an object for storage
      item = {          
        ignoreBoxBool: false
      };
      $ignoreItemsBox.fadeOut('slow');
      $ignoreItemsBox.removeClass('active');
    }
    else {
      // Create an object for storage
      item = {          
        ignoreBoxBool: true
      };
      $ignoreItemsBox.fadeIn('slow');
      $ignoreItemsBox.addClass('active');
    }
    setStorage(item);
  }
  else {
    // Get storage
    var storage = getStorage();
  
    // Create ignore string
    var ingoreString = storage['ignoreList'].join(', ');                               
    // Create spot to add ignores
    var ignoreList = '<div class="ignore-items-box"><form action="#"> '+
                    '<textarea>' + ingoreString + '</textarea><br> '+
                    '<input type="submit" value="Update"> ' +
                    '</form></div>';
                        
    // Append the ignore list
    $('.neocoin-bar').append(ignoreList);
  
    // Bind ignore list update button
    $('.ignore-items-box input[type="submit"]').bind('click', function (e){
      e.preventDefault();
      // Set ignore list (Value of text area)
      setIgnoreList( $(this).siblings('textarea').val() );
    });
    toggleIgnoreBox();  
  }  
}

// Function to show the neotoolbar
function initToolBar() {
  // Get storage
  var storage = getStorage();

  // Toolbar active class string
  var toolbarActive = '';
 
  // Get the source of our logo from chrome extension                                 
  var logoSrc = chrome.extension.getURL('icon48.png');
    
  // Add the toolbar to the body
  $('body').after('<div class="neocoin-bar"></div>');
  
  // Get the toolbar
  var $neoBar = $('.neocoin-bar');

  
  // Can append these all at once
  $neoBar.append(
    // Append the logo
    '<img class="neocoin-logo" src="' + logoSrc + '" style="margin: 3px 0 0 10px"/>'
  );
      
  // Bind the hide and show of neocoin toolbar
  $('.neocoin-logo').bind('click', function() {
    toggleNeoCoinBar();
  });
  
  // Check if toolbar is active
  if (storage['toolbarBool'] === true){
    // If active then call toggle to build the elements
    toggleNeoCoinBar();
  }
}

// Function to randomize all select inputs
function randomSelect(){
  $('select').each(function(){
    var $this = $(this);
    var index = 0;
    while (index <= 2){
      index = Math.floor(Math.random() * $this.children("option").length) + 1;
    }
    $this.children("option:nth-child(" + index + ")").prop("selected", true);
  });
  
}

// Function to get the neocoin object from localStorage
function getStorage(){
  if (!localStorage['neocoin'] ){
    localStorage['neocoin'] = JSON.stringify({});
  }    
  return JSON.parse( localStorage['neocoin'] );
}

// Function to set an attr on our neocoin storage
function setStorage(item){
  var neocoinStorage = getStorage();
  // Deep merge item into neocoinStorage 
  $.extend(true, neocoinStorage, item);
  //console.log('item merge to storage');
  //console.dir(item);
  //console.dir(neocoinStorage);
  setNeocoinStorage(neocoinStorage);
}

// Function to unset a single storage val - check this
function setStorageVal(attr,val){
  var neocoinStorage = getStorage();
  neocoinStorage[attr] = val;
  setNeocoinStorage(neocoinStorage);
}

// Function to unset a single storage val
function unsetRestockVal(itemName){
  // Get storage
  var neocoinStorage = getStorage();
  // Delete from stroage
  delete neocoinStorage['restock'][itemName];
  //console.dir('deleting'+itemName);
  //console.dir(neocoinStorage);
  // Set new storage
  setNeocoinStorage(neocoinStorage);
}

// Function to unique sort our arrays
function sort_unique(arr) {
    arr = arr.sort(function (a, b) { return a*1 - b*1; });
    var ret = [arr[0]];
    for (var i = 1; i < arr.length; i++) { // start loop at 1 as element 0 can never be a duplicate
        if (arr[i-1] !== arr[i]) {
            ret.push(arr[i]);
        }
    }
    return ret;
}

// Function to add to the item ignore list
function setIgnoreList(itemString){
  // Get old storage
  var neocoinStorage = getStorage();  
  
  // Split and trim the string by mapping the array returned from split to the trim
  var itemArray = $.map(itemString.split(","), $.trim);
  console.dir(itemArray);
  // Make unique
  //itemArray = $.unique(itemArray);
  // Sort the array
  //itemArray.sort();
  itemArray = sort_unique(itemArray);
  console.log('Setting new Ignore list');
  console.dir(itemArray);
  
  // Update and set storage
  neocoinStorage['ignoreList'] = itemArray;
  setNeocoinStorage(neocoinStorage);
}

// Function to set a new storage obj
function setNeocoinStorage(neocoin){
  localStorage['neocoin'] = JSON.stringify(neocoin);
}

// Function to set storage defaults
function setStorageDefaults(){
  // Get storage
  var storage = getStorage();
  
  // Reset storage
  //setNeocoinStorage({});
  
  // Reset specific storage attr
  //setStorageVal('restock',{});
  

  ////
  //  Check if anything is MISSING and then set a default

  // Check for auto buy
  if ( !storage['autoBool'] ) {
    // Create an object for storage
    item = {
      autoBool: false
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for restock list
  if ( !storage['restock'] ) {
    // Create an object for storage
    item = {
      restock: {}
    };
    // Set to storage
    setStorage(item);
  }
    
  // Check for ignoreList
  if ( !storage['ignoreList'] || storage['ignoreList'].length == 0 ){
    
    // Create an object for storage
    item = {
      ignoreList: [
        'Banana and Kiwi Pizza', 'Blue Ruki Morphing Potion', 'Blueberry Neodrops', 'Cactus Leaf', 'Chocolate Koi Biscuit', 
        'Chocolate Koi Biscuit', 'Dried Bamboo Mat', 'Dung Arm Chair', 'Elegant Air Faerie Bathtub', 'Elegant Air Faerie Bathtub', 
        'Factor 30 Sun Tan Lotion', 'Factor 30 Sun Tan Lotion', 'Flotsam Flakes', 'Fried Trilo Bites', 'Ghost Moehog Flying Disc', 
        'Ghost Moehog Flying Disc', 'Glowing Fire Axe', 'Green Lupe Plushie', 'Green Lupe Plushie', 'Lime Candy Rock', 
        'Maractite Gauntlets', 'Meerca Fruit Burger', 'Meerca Fruit Burger', 'Meridell Travel Brochure', 
        'Neovian Blumaroo Gentleman Trousers', 'Neovian Blumaroo Gentleman Trousers', 'Nuranna with Laserbeams', 
        'Orange Koi Morphing Potion', 'Qando Bread', 'Red Xweetok Morphing Potion', 'Roboto Shoulders', 'Sand Pita', 
        'Scroll of the Fool', 'Scroll of the Fool', 'Slychi the Skeith Invader', 'Sun Hat', 'Sun Hat', 'Supersize Mega Ultra Plus', 
        'Symol Paddleball', 'Tears of the Water Faerie', 'The Phantom', 'Time Traveller Peophin Jacket', 'Time Traveller Peophin Jacket', 
        'Torn White Gym Socks', 'Trapped', 'Trilo Bite', 'Trilo Bite', 'Veggie Crisps', 'Venuquin', 'Venuquin', 'Woollen Cap', 
        'Woollen Cap', 'Ye Olde Petpets Stall Background', 'Ye Olde Petpets Stall Background', 'Yellow Gnorbu Morphing Potion'
      ]
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for shops
  if (!storage['shopsList'] || isEmpty(storage['shopsList']) ){
    item = {
      shopsList: {
        1: true, 2: true, 3: true, 4: true, 5: true, 7: true,
        9: true, 13: true, 14: true, 15: true, 16: true,  18: true,
        20: true, 30: true, 31: true, 34: true, 35: true, 37: true,
        38: true, 39: true, 41: true, 42: true, 46: true, 47: true, 49: true, 51: true,
        56: true, 58: true, 62: true, 63: true, 66: true, 
        73: true, 77: true, 78: true, 81: true, 82: true, 
        83: true, 85: true, 90: true, 92: true, 93: true, 
        98: true, 101: true, 102: true, 105: true, 106: true
      }
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for quickPrice
  if ( storage['quickPriceBool'] == null || typeof storage['quickPriceBool'] == undefined ) {
    // Create an object for storage
    item = {
      quickPriceBool: false
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for refresh min time
  if ( !storage['refreshTimeoutMin'] ) {
    // Create an object for storage
    item = {
      refreshTimeoutMin: 20
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for refresh max time
  if ( !storage['refreshTimeoutMax'] ) {
    // Create an object for storage
    item = {
      refreshTimeoutMax: 25
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for minProfitHighlight Settings
  if ( !storage['minProfitHighlight'] ) {
    // Create an object for storage
    item = {
      minProfitHighlight: 500
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for minProfitHaggle Settings
  if ( !storage['minProfitHaggle'] ) {
    // Create an object for storage
    item = {
      minProfitHaggle: 850
    };
    // Set to storage
    setStorage(item);
  }
  
  // Check for minProfitNoHaggle Settings
  if ( !storage['minProfitNoHaggle'] ) {
    // Create an object for storage
    item = {
      minProfitNoHaggle: 2000
    };
    // Set to storage
    setStorage(item);
  }
// End set defaults
}

// Function to open a window without focusing
function openWindow(url) {
  window.open(url, '_blank', 'width= 100, height= 100, left=0, top=0, scrollbars=yes, resizable=yes, toolbar=no, location=no, directories=no, status=no, menubar=no, copyhistory=no');
}

// Function to close current window
function closeWindow(){
  window.open('', '_self', ''); //bug fix from window not closing
  window.close();
}

// Function to check the wishing tree for prices
function checkWishingTree(){
  // UniqueArray
  var uniqueArray = {} ;
  var itemArray = [];
  var name;
  var $this;
  var urlSafe;
  var returnItems;
  // Loop each item and package it for AJAX price check
  $('.contentModuleContent table:first td b').each(function(){
    $this = $(this);
    name = $this.text();
    
    // Make sure we are unique
    if ( !uniqueArray.hasOwnProperty(name) ){
      uniqueArray[name] = true;
      //console.log(name);
    
      // If the item is pure np then dont ajax for it
      if ( name.indexOf('NP', -2) !== -1){
          //console.log('pure np');
          //console.log(name.substring(0,name.length - 3));
      }
      else {
        // If the item is not pure NP
        // Push a new item to the array
        itemArray.push({
          name: name
        });
        // End not pure NP
      }  
    // End item is unique
    }
  // End loop of items
  });
  
  // Make the array unique
  //itemArray = make_unique(itemArray);
  
  // Stringify and encode our item set
  urlSafe = encodeURIComponent( JSON.stringify( itemArray ) );
  // Ajax out to find item prices
  $.ajax({
    url: "http://blooming-eyrie-4580.herokuapp.com/group?data=" + urlSafe,
    dataType: 'text',
    success: function(data){
      returnItems =  JSON.parse(data);
      // Pass the items to getWishingTree function to nab the best
      getWishingTree(returnItems);
    }
  });
}

// Function to open the most important item
function getWishingTree(itemSet){
  // Counter vars (i is counter and l is length of itemset)
  var i = 0, l = itemSet.length;
  var bestProfit = 0;
  var giftLink;
  //var bestItem;
  var storage = getStorage();
    
  // Loop vars init above
  for ( ; i < l; i++ ) {
    //console.dir(itemSet[i]);
    
    // If item is unknown get it
    if ( itemSet[i].salePrice == 0 ) {
      giftLink = $('.contentModuleContent table:first td:contains(' + itemSet[i].name + ') a').attr('href');
      giftLink = 'http://www.neopets.com/' + giftLink;
      console.log('Getting unknown item' + bestItem);
      openWindow(giftLink);
    }
    // Check each best items
    else {             
      // If best profit then set
      // if ( itemSet[i].salePrice > bestProfit ) {
//         bestProfit = itemSet[i].salePrice;
//         bestItem = itemSet[i].name;
//         bestSalePrice = itemSet[i].salePrice;
//       }
    
      // Show how amazing the profit is for each with same name
      if ( itemSet[i].salePrice >= storage['minProfitNoHaggle'] ) {
        $('.contentModuleContent table:first td:contains(' + itemSet[i].name + ')').each(function(){
          $(this).css('outline','2px solid #FFDF40');
        });
        
        // If over No haggle profit (2k) then just grab it
        console.log('Buying each ' + itemSet[i].name);
        // Try to get each one
        $('.contentModuleContent table:first td:contains(' + itemSet[i].name + ')').each(function(){
          $(this).children('a').each(function(){
            giftLink = $(this).attr('href');
            giftLink = 'http://www.neopets.com/' + giftLink ;
            console.log('Getting item' + itemSet[i].name );
            openWindow(giftLink);
          });
        });
        // OLD BELOW
        // giftLink = $('.contentModuleContent table:first td:contains(' + itemSet[i].name + ') a').attr('href');
        // giftLink = 'http://www.neopets.com/' + giftLink ;
        // console.log('Getting item' + itemSet[i].name );
        // openWindow(giftLink);
      }
      else if ( itemSet[i].salePrice >= storage['minProfitHaggle'] ) {
        $('.contentModuleContent table:first td:contains(' + itemSet[i].name + ')').each(function(){
          $(this).css('outline','2px solid #FF8040');
        });        
      }
      else if ( itemSet[i].salePrice >= storage['minProfitHighlight'] ) {
        $('.contentModuleContent table:first td:contains(' + itemSet[i].name + ')').each(function(){
          $(this).css('outline','1px solid #BEBEBE');   
        });
      }
    
      // Add in the price to each item with same name
      $('.contentModuleContent table:first td:contains(' + itemSet[i].name + ') b').each(function(){
        $(this).after('<div>Sells for:' + itemSet[i].salePrice + '</div>');
      });
    // End Check best items item is not 0
    }
  // End loop of items
  } 
  
    // TO DO STUB WORK - WE ARE IGNORING BEST ITEM JUST GETTING ANYTHING OVER 2k
    // Done checking for best item now grab it
    // If we have a best item and ites sale price is > then our mins
    // if ( bestItem && 
    //       ( bestSalePrice >= storage['minProfitNoHaggle'] || bestSalePrice >= storage['minProfitHaggle']  ) 
    //   ) {
    //     // Now get best item
    //     giftLink = $('.contentModuleContent table:first td:contains(' + bestItem + ') a').attr('href');
    //     giftLink = 'http://www.neopets.com/' + giftLink ;
    //     console.log('Getting best item' + bestItem);
    //     openWindow(giftLink);
    //   }
    //   else {
    //     console.log('no item');
    //   }

}

// Function to check prices of neoshops and garage sales
function checkPrices(){
  var storage = getStorage();
  var timeoutCounter = 0;
  var items = [];
  var $this;
  var name;
  var priceCheck;
  $('form[name="items_for_sale"] tr td').each(function () {
    
    // Set this
  	$this = $(this);
    
    // Get item name
		name = $this.children('b').text();
		
    // Skip these searches 
		if ( name == 'Shop Inventory ' || name == ' ' || name == '' ){
			return true;
		}
    
		// See how much the item is selling for
		priceCheck = $this.text().match(/Cost: (.*?) NP/);

    // If no price check for garage sale layout
		if ( !priceCheck ) {
		  // Garage sale has different layout
			priceCheck = $this.text().match(/Cost : (.*?) NP/);
		}		
		
    // If this item has no set price skip it
		if ( priceCheck ) {
 		  priceCheck = priceCheck[1];
		}
		else {
      // Skip by returning true
			return true;
		}
    
    // Push a new item to the array
    items.push({
      name: name,
      price: priceCheck
    });
		
  // End each item loop
  });
  
  ajaxItems(items);
// End   
}

// Post out our item array
function ajaxItems(group){
  console.log('Ajaxing to check prices on ' + group.length + ' items...');
  //console.dir(group);
  var urlSafe = encodeURIComponent( JSON.stringify( group ) );
  var returnItems;
  // Ajax out to find item prices
  $.ajax({
    url: "http://blooming-eyrie-4580.herokuapp.com/group?data=" + urlSafe,
    dataType: 'text',
    success: function(data){
      returnItems =  JSON.parse(data) ;
      //console.dir(returnItems);
      checkItems(returnItems);
    }
  });
}


// Giving a JSON object with set prices and items grab the best one!
function checkItems(itemSet){
  console.log('Checking returned item set for best profit & unknown price 0\'s  ');
  //console.dir(itemSet)

  // Get the storage
  var storage = getStorage();
  // Init vars
  var bestProfit = 0;
  var bestItem = '';
  var timeoutCounter = 0;
  // Init more vars for loop
  var i = 0, 
    salePrice, 
    shopPrice, 
    profit, 
    $item, 
    isIgnored;
  // Init more vars for auto 0 buy
  var itemLink;
  // Array if items we will buy
  var itemArray = [];
  var b;
  // Find the best profit
  for ( ; i < itemSet.length; i++) {     
    // Find sale price
    salePrice = itemSet[i].salePrice.toString().replace(/\,/g,'');
    // Find shop price
    shopPrice = itemSet[i].shopPrice.toString().replace(/\,/g,'');
    // Find profit
    profit =  parseInt(salePrice) - parseInt(shopPrice);

    //console.dir( itemSet[i] );
    //console.log('item '+itemSet[i].name+' shop: '+shopPrice+' sale:'+salePrice + ' profit:'+profit);

    // Get the item element
    // STUB NOTE: WORK: TO DO: MAYBE  This needs to be more specific
    // The items has to start with the text now
    // We are now filtering by items starts with item name
    $item = $(".contentModuleContent td:contains('" + itemSet[i].name + "')").filter(function(){
      b = $(this).children('b');
      if ( b.length > 0 ) {
        var pattern = new RegExp('^' + itemSet[i].name, 'g');
        return b.text().match(pattern);
      }
    });
    
    ////  
    //  If price is 0 auto buy it
    // Dance flag is flagging the block to break for our break if ignored
    dance:
    if ( parseInt(salePrice) == 0 && storage['autoBool'] === true ) {
      // STUB - TO DO - WORK - Check if we need this maybe want to timeout multiples
      // For multiple buys
      if ( timeoutCounter == 0 ) {
        timeoutCounter = 1;
      }
      else {
        timeoutCounter += 1;
      }
     
      // Check if item is in ignore array
      // Return -1 if not in array
      isIgnored =  $.inArray(itemSet[i].name, storage['ignoreList']);
      if( isIgnored !== -1 ) {
        console.log('ignored 0 priced item: ' + itemSet[i].name);
        break dance;
      }
       
      // Garage sale is different layout
      if ( $item.length == 0 ) {
        $item = $("form[name='items_for_sale'] td:contains('" + itemSet[i].name + "')");
        itemLink = $("form[name='items_for_sale'] td:contains('" + itemSet[i].name + "')").children('a').attr('href');
        itemLink = 'http://www.neopets.com/winter/' + itemLink;
        openWindow(itemLink);          
      }
      // Not garage sale
      else {
        // Find the link
        var clickFunc = $item.children('a').attr('onclick');
        // Find the item link info
        var itemInf = clickFunc.match(/j_info_id=(\d+)&stock_id=(\d+)&brr=(\d+)/);
        // If we can pull out the url
        if (itemInf.length > 2) {
        
          // Create empty item for restock        
          var item = {
            restock: {}
          };
        
          // Set profit to no haggle min profit for auto buy
          profit = storage['minProfitNoHaggle'];
        
          // Set item details
          item['restock'][itemSet[i].name] = {
            price: shopPrice,
            sellPrice: salePrice,
            profit: profit
          };
        
          console.log('Auto buy: '+itemSet[i].name);
          setStorage(item);
                                           
          // Construct buy link with item info
          var url = 'http://www.neopets.com/haggle.phtml?obj_info_id=' + itemInf[1]+'&stock_id='+ itemInf[2] + '&brr=' + itemInf[3];
                                         
          // Use timeout counter for multiple buys (6 seconds between 1 for buy 5 for timeout) 
          // First is 0 * 1000 = 0 instant -  After that its (previous + 6) seconds
          var t = setTimeout(function(){ 
            openWindow(url); 
          }, timeoutCounter );
        }
        // End of we can find url
      }
      
    }
    //  End If price is 0 auto buy it
    ////
    
    // Garage sale is different layout
    if ( $item.length == 0 ) {
      $item = $("form[name='items_for_sale']  td:contains('"+itemSet[i].name+"')").filter(function(){
        b = $(this).children('b');
        if ( b.length > 0 ) {
          var pattern = new RegExp('^' + itemSet[i].name, 'g');
          return b.text().match(pattern);
        }
      });
      
    }
    // If we found a true item
    if ( $item.length !== 0 ) {
      // Delete the last line break 
      $item.children('br').last().remove();
                                 
      // Add in the sell price and profit
      $item.append('Sells: ' + itemSet[i].salePrice + '<br />Profit: ' + profit);
                                 
      // Show how amazing the profit is
      if ( profit >= storage['minProfitNoHaggle'] ) {
        $item.css('outline','2px solid #FFDF40');
        itemArray.push({
          name: itemSet[i].name,
          salePrice: itemSet[i].salePrice,
          shopPrice: itemSet[i].shopPrice,
          profit: profit
        });
      }
      else if ( profit >= storage['minProfitHaggle'] ) {
        $item.css('outline','2px solid #FF8040');
      }
      else if ( profit >= storage['minProfitHighlight'] ) {
        $item.css('outline','1px solid #BEBEBE');                      
      }
      
      if ( profit > bestProfit ) {
        bestProfit = profit;
        bestItem = itemSet[i].name;
        bestSalePrice = itemSet[i].salePrice;
        bestShopPrice = itemSet[i].shopPrice;
        //console.log('New best item!' + itemSet[i].name);
      }
    }   
  }
  // End for loop of items
  // Now operate on best item
  
  // Check if item is in ignore array - returns -1 if not in array
  isIgnored =  $.inArray(bestItem, storage['ignoreList']);

  // If its a decent profit not not ignored
  // And it is not already being auto bought because it is a 0 price (above)
  if (bestProfit > storage['minProfitHaggle'] && isIgnored === -1 && parseInt(bestSalePrice) !== 0 ){
    // If we have auto on 
    if ( storage['autoBool'] === true ) {
      // STUB - TO DO - WORK - Removed from above: "and the item is not already in progress" 
      //    Removed the storage restock check here so if item isn't properly removed from restock we will buy it
      //    was-     (storage['autoBool'] === true && !storage['restock'][name] )
      // Maybe add check for timeout on items in restock to remove them
      
      console.log('Auto Buy - Best item: ' + bestItem + ' Costs: ' + bestShopPrice + ' Sells: ' + bestSalePrice + ' Profit: ' + bestProfit);
      
      // Remove the best from the array because we will buy it here and not loop it later
      delete itemArray[bestItem];

      // STUB - TO DO - WORK - Check if we need this maybe want to timeout multiples
      // For multiple buys
      if ( timeoutCounter == 0 ) {
        timeoutCounter = 1;
      }
      else {
        timeoutCounter += 2000;
      }
       
      // Get the item container
      $this = $(".contentModuleContent td:contains('" + bestItem + "')");
       
      // Garage sale is different layout
      if ( $this.length == 0 ){
        $this = $("form[name='items_for_sale'] td:contains('" + bestItem + "')");
        itemLink = $("form[name='items_for_sale'] td:contains('" + bestItem + "')").children('a').attr('href');
        itemLink = 'http://www.neopets.com/winter/' + itemLink;
        //window.location = itemLink;
        openWindow(itemLink);
      }
      else {
        // Not garage sale
        // Find the link
        var clickFunc = $this.children('a').attr('onclick');
        // Find the item info
        var itemInf = clickFunc.match(/j_info_id=(\d+)&stock_id=(\d+)&brr=(\d+)/);
       
        //If we can pull out the url
        if (itemInf.length > 2) {
          // Create blank restock var
          var item = {
            restock: {}
          };
          // Set the item restock
          item['restock'][bestItem] = {
            price: bestShopPrice,
            sellPrice: bestSalePrice,
            profit: bestProfit
          }
                  
          // Set the item to storage
          setStorage(item);
                                           
          // Construct buy link with item info
          var url = 'http://www.neopets.com/haggle.phtml?obj_info_id=' + itemInf[1]+'&stock_id='+ itemInf[2] + '&brr=' + itemInf[3];
                                         
          // Use timeout counter for multiple buys (5 seconds between)
          // Normally was * 1000 ms to seconds (we are shortening it)
          var t =setTimeout(function(){ 
            openWindow(url); 
          }, timeoutCounter );
        // End we found url 
        }
      // End not garage sale
      }
    // End auto bool & not in restock array already 
    }
  // End not ignored & best profit greater than minProfitNoHaggle
  }
  
  // Buy the entire pack
  for (i = 0 ; i < itemArray.length; i++) {
    // If we have auto on
    // Check if item is in ignore array - returns -1 if not in array
    isIgnored =  $.inArray(itemArray[i].name, storage['ignoreList']);
    // Make sure auto is on, the item is not ignored, the price is not 0, and it isn't the best profit
    if ( storage['autoBool'] === true && 
          isIgnored === -1  && 
          parseInt(itemArray[i].salePrice) !== 0 &&
          itemArray[i].name != bestItem
      ) {
      singleItem = itemArray[i].name;
      salePrice = itemArray[i].salePrice;
      shopPrice = itemArray[i].shopPrice;
      profit = itemArray[i].profit;
      // STUB - TO DO - WORK - Check if we need this maybe want to timeout multiples
      // For multiple buys
      if ( timeoutCounter == 0 ) {
        timeoutCounter = 1;
      }
      else {
        timeoutCounter += 7000;
      }
      
      // Get the item container
      $this = $(".contentModuleContent td:contains('" + singleItem + "')");
       
      // Garage sale is different layout
      if ( $this.length == 0 ) {
        // SKIP GARAGE SALE ONLY BUY BEST PROFIT ONE
        //$this = $("form[name='items_for_sale'] td:contains('" + singleItem + "')");
        //itemLink = $("form[name='items_for_sale'] td:contains('" + singleItem + "')").children('a').attr('href');
        //itemLink = 'http://www.neopets.com/winter/' + itemLink;
        //openWindow(itemLink);
      }
      else {
        // Not garage sale
        // Find the link
        var clickFunc = $this.children('a').attr('onclick');
        // Find the item info
        var itemInf = clickFunc.match(/j_info_id=(\d+)&stock_id=(\d+)&brr=(\d+)/);
       
        //If we can pull out the url
        if (itemInf.length > 2) {
          // Create blank restock var
          var item = {
            restock: {}
          };
          // Set the item restock
          item['restock'][singleItem] = {
            price: shopPrice,
            sellPrice: salePrice,
            profit: profit
          }
                  
          // Set the item to storage
          setStorage(item);
                                           
          // Construct buy link with item info
          var url = 'http://www.neopets.com/haggle.phtml?obj_info_id=' + itemInf[1]+'&stock_id='+ itemInf[2] + '&brr=' + itemInf[3];
                                         
          // Use timeout counter for multiple buys (5 seconds between)
          // Normally was * 1000 ms to seconds (we are shortening it)
          var t = setTimeout(function(){ 
            openWindow(url); 
          }, timeoutCounter );
        // End we found url 
        }
      // End not garage sale
      }
    // END we have auto
    }
    
  }
  
// End check items
}

// Function to quick price price any items below minPrice
function priceShop(minPrice){
  console.log('Pricing items under ' + minPrice);
  $('form[action="process_market.phtml"] table tr').each(function(index) {
  	var $this = $(this);
  	var $costInput =  $this.children('td').children('input[name^="cost_"]');
  	// Current cost
    var cost = $costInput.val();
    // Log div
    var $neolog = $('.neolog').html('-- Repricing --');
    
    // Skip if not a real item
    if (typeof cost === "undefined"){
      return true;
    }
    
    // Make sure we have an int with no commas
    cost = parseInt(cost.replace(/,/g, ''), 10);
    if (typeof minPrice === "String"){
      minPrice = parseInt(minPrice.replace(/,/g, ''), 10);
    }
  	// If item is less then or equal to minprice
  	if (cost <= minPrice){
  		// Get the name
  		var name = $this.children('td:first').text();
  		if (name){
  			nameEncoded = encodeURIComponent(name);
  //			console.log('Ajaxing '+ 'http://items.jellyneo.net/index.php?go=show_items&name='+name+'&name_type=exact&desc=&cat=0&specialcat=0&status=0&rarity=0&sortby=name&numitems=1');
  			$.ajax({
  			     url: "http://items.jellyneo.net/index.php?go=show_items&name="+nameEncoded+"&name_type=exact&desc=&cat=0&specialcat=0&status=0&rarity=0&sortby=name&numitems=1",
  			     dataType: 'text',
  			     success: function(data){
    					 //console.log('Response good');
    					 //console.log(data);
    					 //create jquery object from the response html
    					 var $response = $(data);
    					 var priceCheck = data.match(/<b>(.*?) NP<\/b>/);
    					 if (priceCheck) {
    						 var price = priceCheck[1];
                 // Convert to int
                 price = parseInt(price.replace(/,/g, ''), 10);
                 // Set price in shop
                 //console.dir($costInput);
    						 $costInput.val(price);
                 // Add to the log
                 $neolog.append('<li>'+name+': '+price+' (was: '+cost+') -- Diff: '+(price-cost)+'</li>');
               
    					 }					 
  			     },
  			     error:function(jqXHR, textStatus, errorThrown) {
  			        console.log("error " + textStatus);
  			        //console.log(jqXHR);
  			    },
  			});
  		// End name				
  		}
  	// End item is 0
  	}
  	else {
  		//console.log('Value '+$costInput.val());
  	}
    // END form each
  });
}

// Function to set current NP to localstorage
function setNeopoints(){
  // Get current NP
  var neopoints = $('#npanchor').text();
  // Replace any commas for proper parseint
  neopoints = neopoints.replace(/,/g, '');

  // Create an object for storage
  var item = {
    np: neopoints
  };
  // Set the NP to storage
  setStorage(item);  
}

// Function to get minimum amount of neopoints for restocking
function getMinimumNeopoints(){
  var storage = getStorage();
  //console.log('current Np: ' + storage['np'] + ' npMin'+storage['npMin']);
  return parseInt(storage['np']) - parseInt(storage['npMin'])
}

// Function to get the query string param value and return it
function getParam(param) {
  var query = new RegExp('[?|&]'+param+'=(.*?)(&|$)');
  var search = document.URL.match(query);
  if (search){
    return search[1];
  }
}

// STUB - WORK - TO DO - Check and update or remove this
// Function to automatically get NP - CHECK THIS
function getAutoNeopoints(){
  var pathname = window.location.pathname;
  var search = window.location.search;
  // Check if it is the bank
  if(pathname == '/bank.phtml'){
    
  }
  // Check if it is shop till
  else if ( pathname == 'market.phtml' && search.test('?type=till') ){
    
  }
  else {
    
  }
}

// Auto from storage directive
function autoStorage(){
  // Get the path to check for NAC on certain paths
  var pathname = window.location.pathname;
  
  var autoDirectives = getStorage()['nac'];
  
  // Loop possible path directives
  for (var directive in autoDirectives ) {
    if ( autoDirectives.hasOwnProperty(directive) ) {
      // If the key is the page path
      if ( pathname == directive ) {        
        // Run the directive in our autolist
        autoList[autoDirectives[directive]]();
      }
    }
  }
}

// Function to submit haggle form
function submitHaggle(){
  var $captcha = $('input[type="image"]');
  var img = new Image($captcha.height, $captcha.width);
  img.src = $captcha[0].src
    
  $('body').append('<canvas />');
  var $canvas = $('canvas');
    
  var canvas2dContext = $canvas[0].getContext('2d'); 
  canvas2dContext.drawImage(img, 0, 0 );
    
  $canvas.height = $captcha.height;
  $canvas.width = $captcha.width;
    
  var xX;
  var yY;
  var clickOff = $('input[type="image"]').offset();
  img.onload = function(){
    canvas2dContext.drawImage(img, 0, 0 ); 
      
    // Get the pixel data
    var imageData = canvas2dContext.getImageData(0, 0, $('input[type="image"]')[0].width, $('input[type="image"]')[0].height);

    // Loop through imageData.data - an array with 4 values per pixel: red, green, blue, and alpha
    var closest = 255+255+255;

    for (x = 0; x < (imageData.width - 5); x++) {
        for (y = 0; y < (imageData.height - 5); y++) {
            var index = 4 * (y * imageData.width + x);
            var r = imageData.data[index];
            var g = imageData.data[index + 1];
            var b = imageData.data[index + 2];
            var a = imageData.data[index + 3];
            
            if ( (r+g+b) != 0 && (r+g+b) < closest ){
              closest = (r+g+b);
              xX = x;
              yY = y;
            }
        }
    }
      
    // Testing overlay to show where we will click
    $('body').append('<div class="ok" />');
    $('.ok').css({position:'absolute',top:clickOff.top+yY,left:clickOff.left+xX,width:'5px',height:'5px',background:'red'});
    
    // Create click inside the image
    var e = new jQuery.Event("click");
    e.pageX = clickOff.left + xX;      
    e.pageY = clickOff.top + yY;
    
    var xInput = document['createElement']('input');
    		xInput['setAttribute']('name', 'x');
    		xInput['setAttribute']('value', xX + Math['floor'](Math['random']() * 5));
    		xInput['setAttribute']('type', 'hidden');
    var yInput = document['createElement']('input');
    		yInput['setAttribute']('name', 'y');
    		yInput['setAttribute']('value', yY + Math['floor'](Math['random']() * 5));
    		yInput['setAttribute']('type', 'hidden');
    		document['getElementsByName']('haggleform')[0]['appendChild'](xInput);
    		document['getElementsByName']('haggleform')[0]['appendChild'](yInput);
            
    $('input[type="image"]').trigger(e);
  };
};

// Object - Function for pathname == '/objects.phtml' 
// Shops
function objectsPathInit(){
  // Check if it is a valid shop
  var neoShopRegex = /\?type=shop&obj_type=/g;
  var neoShopRexexTwo = /\?obj_type=\d+&type=shop/g;
  
  var isNeoShop = neoShopRegex.test(location.search);
  var isNeoShopTwo = neoShopRexexTwo.test(location.search);
  var restockBanned;
  
  if ( isNeoShop || isNeoShopTwo ) {
    
    // Check to see if possible restock ban
    restockBanned = $('#content').html().match('Sorry, we are sold out of everything!');
    // Check if shop is empty - Turn auto off
  	// STUB - TO DO - WORK - if possible - Check for item name (from storage?) and remove from restock
    if ( restockBanned ) {
      console.log('Restock ban');
      ////
      //  STUB - REPLACE WITH CHECK AT TIKI SHOP
      // Create an object for storage
      var item = {
        autoBool: false
      };
      // Set autoBool false to storage
      //setStorage(item); 
    }
    else {
      // Not restock banned so check prices
      checkPrices();
    }
  } 
};

// Market - Function for Quick Price in our shop
function marketPathInit(){
  // Get storage  & check if quick price module is enabled
  var storage = getStorage();
  if ( storage['quickPriceBool'] ) {
    // Pattern to make sure it's your shop
    var yourShopRegex = /\?type=your/g;
    var yourShopRegexTwo = /&type=your/g;
    var isYourShop = yourShopRegex.test(location.search);
    var isYourShopTwo = yourShopRegexTwo.test(location.search);
    
    // Check if your shop
    if ( isYourShop || isYourShopTwo ) {
      // Add the Quick Price button     
      $('.content > table').after('<form class="neoprice" style="text-align:center;padding:5px;">Quick price items below <input type="text" value="0" style="width:50px;"> <input type="submit" value="Go!"> <input class="neosave" type="button" value="Save!"></form><ul class="neolog"></ul>');
      
      // Bind Quick Price Save button
      $('.neosave').live('click', function(){
        $('input[value="Update"]').click();
      });
      
      // Bind form submit
      $('.neoprice').submit(function(){
        // Get the minimum price from form
        var minPrice = this[0].value || 0;
        // Price the shop
        priceShop(minPrice);
        // Prevent form submission
        return false;
      });
    }
  }
};

// Grump & Wise King - Add random button
function kingsPathInit(){
  // Add randomize button
  $('.content img').first().after('<br><button type="button" class="random-select">Random!</button>');
  // Bind the new button
  $('.random-select').bind('click',function(){
    randomSelect();
  });
  // Bind the kings image for clicking 
  $('.content img').first().bind('click',function(){
    randomSelect();
  });
}

// Haggle - Function for haggeling
function hagglePathInit(){
  // Cache the content
  $content =  $('#content');
  var storage = getStorage();
  var itemName;
  // See if we have already bought
  var boughtItem = $content.html().match('has been added to your inventory');
  // See if the item is sold out
  var soldOut = $content.html().match('SOLD OUT!');
  // See if out of money
  var outOfMoney = $content.html().match('Get out of my shop');
  // See if we don't have enough np
  var notEnough = $content.html().match('Uh oh... better run!');
  // See if we missed the captcha
  var captchaMiss = $content.html().match('You must select the correct pet in order to continue.');
  // See if we need to refresh because of buying timeout
  var buyTimeout = $content.html().match('one item every five seconds');
  
  // If we are waiting to buy then refresh the page
  if ( buyTimeout ){
    var t = setTimeout(function(){
      window.location.reload();
    }, 2000);
  }
  
  // Check if we miss the captcha
  if( captchaMiss ){
    var captchaMiss;
    if ( storage['captchaMiss'] ){
      captchaMiss = storage['captchaMiss'] + 1;
    }
    else {
      captchaMiss = 1;    
    }
    var item = {
      captchaMiss: captchaMiss
    };
    // Set autoBool false to storage
    setStorage(item);    
  }    
  
  // Check if out of money - Turn auto off
	// STUB - TO DO - WORK - Check for item name and remove from restock
  if ( outOfMoney || notEnough ) {
    console.log('Out of money - Turning auto off');
    // Create an object for storage
    var item = {
      autoBool: false
    };
    // Set autoBool false to storage
    setStorage(item);  
	}
  // Check if we bought the item - unset the restock var
  else if ( boughtItem ) {
    itemName = $content.html().match(/Buying :  (.*?)<\/b>/i)[1];
    // Check if item is in restock
    if ( storage['restock'] && itemName) {
      console.log('Bought item: ' + itemName);      
      
      // Unset restock item
      if ( storage['restock'][itemName] ) {
        console.log('Unsetting item');
        unsetRestockVal(itemName);
        closeWindow();
      }
      else {
        console.log('Item not in restock');
        closeWindow();
      }
    }
  }
  // If item sold out - unset the restock var
  else if ( soldOut ){
    itemName = $content.html().match(/<b>(.*?) is SOLD OUT!<\/b>/i)[1];
    // Check if item is in restock
    if ( storage['restock'] && itemName) {
      console.log('Sold out of item: ' + itemName);      
      // Unset restock item
      if ( storage['restock'][itemName] ) {
        console.log('Unsetting item');
        unsetRestockVal(itemName);
        closeWindow();
      }
      else {
        console.log('Item not in restock');
        closeWindow();
      }
    }
  } 
  // Else we are in the haggle mode!
  else {
      // Find item name
      itemName = $content.html().match(/Buying :  (.*?)<\/b>/i)[1]; 
      // If we found the item we are haggeling
      if ( itemName ) {
        // Init vars for haggeling
        var currentOffer, previousOffer, offer

        currentOffer = $content.html().match(/ Current Offer<\/b> : (\d*,*\d*) Neopoints/)[1];
        currentOffer = parseInt( currentOffer.replace(',','') );
      
        previousOffer = $content.html().match(/ Previous Offer<\/b> : (\d*,*\d*) Neopoints/)[1];
        previousOffer = parseInt( previousOffer.replace(',','') );
      
        // Check if item is set for auto restock
        if ( storage['restock'][itemName] ){
          var offer;
          // Regex out how much the shop wants
        
          //var shopAsks = $content.html().match(/ (\d*,*\d*)(\?| Neopoints ).*?<\/b>/)[1];
          // New regex
          var shopAsks = $('#content font b').last().html().match(/ (\d*,*\d*)(\s|\.\.\.|\?|!|\.)/)[1];
          shopAsks = parseInt(shopAsks.replace(',',''));
          
          // If the profit is greater than our minimum no haggle profit offer what the shop asks
          if ( storage['restock'][itemName]['profit'] >= storage['minProfitNoHaggle'] ){
            // If profit is huge then just offer what shop asks
            offer = shopAsks;
          }
          // If profit not big then figure out the haggle
          else {
            // If we have a previous offer then offer 2x previous offer
            if ( previousOffer != 0 ) {
              // If not first offer then offer 2x previous
              offer = (previousOffer * 2);
              
            }
            // If we have a currentOffer (1st haggle round)
            else if ( currentOffer != 0 ) {
              // If first offer then offer 2x cyrrent
              offer = (currentOffer * 2);
            }
            // Else no current or previous offers so offer 20% of shop price
            else {
              // If first offer then offer 20%
              // Set 20% of what shop wants
              offer = Math.round(  (shopAsks * 0.2) );
            }
          }
          
          // If offer is better then shops asks
          if ( offer > shopAsks && shopAsks !== 0 ) {
            // Set to what the shop wants!
            offer = shopAsks;
          }
          
          // If our offer is valid submit it!
          if ( offer > 0 ) {
            //console.log('Shop asks: ' + shopAsks + ' We haggle: ' + offer);
            $('input[name="current_offer"]').val(offer);
            submitHaggle();
          }    
      // End we found item in restock array
      }
    // End we the item name on page
    } 
  // End Else we are in haggle mode      
  }
// End hagglePathInit
}

// Wishing Tree
function wishingTreePathInit(){
    checkWishingTree();
}

// Function to close if we miss a donation
function takeDonationPathInit(){
  var tooSlow = $('.content').html().match('Too late...somebody seems to have taken that item while you were pondering.')
  if ( tooSlow ){
    closeWindow();
  }
}
// Function to check if we need to manage np
function checkNeopoints(){
  var storage = getStorage();
  var current = parseInt(storage['np']);
  var max = parseInt(storage['npMax']);
  var min = parseInt(storage['npMin']);
  // If we have less then min or more then max hit up the bank
  if( current < min ||
      current > max
  ){
    openWindow('http://www.neopets.com/bank.phtml?nac=mgb');
  }
  else {
    console.log('nothing to do with current: '+current + 'and max: '+max+' and min'+min );
  }
};

// Function to check for special "Something Has Happened" notices
function checkForSomething(){
  if ($('#content').html().match(/Something Has Happened/g)){
    var notice = $('table:contains("Something Has Happened")').last().text();
    alert(notice);
  }
};

// Run script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  ////
  //  Note: moved defaults outside of haggle page
  //  Meaning going to a haggle page will not ever set defaults
  
  // Get any auto directive query string params
  var autoVal = getParam('nac');

  // Find and set current neopoints
  //setNeopoints();
  // Check if we have enough neopoints
  //checkNeopoints();
  // Check for something has happened
  //checkForSomething();

  // If not haggeling - Set defaults, add styles, init neocoin toolbar
  if ( location.pathname !== '/haggle.phtml' ) {
    // Set defaults
    setStorageDefaults();
    
    // Add style sheets
    injectStyle();
    
    // Init the neocoin bar
    initToolBar();
  }
  
  ////
  //  Check for NAC Auto directives
 
  // See if we have an auto directive (via query string) and run if so
  if ( autoVal ) {
      // These are for the query string ?nac= 
    if ( autoList[autoVal] ){
      // Run the function from autolist if we have one
      autoList[autoVal]();
    }
    else {
      console.log('Error: ' + autoVal + ' is not a function on autoList.');
    }
  }
  else if ( getStorage()['nac'] ) {
      // Else check our local storage for an auto directive
    autoStorage();
  }
  
  ////
  //  Location check -  Call specific function per location
  
  // Check if it is shops
  if ( location.pathname == '/objects.phtml' ) {
    objectsPathInit();
  }
  // Check if it is the garage sale
  else if ( location.pathname == '/winter/igloo2.phtml' ) {
    // Igloo - no inits - just check prices
    checkPrices();
  }
  // Check if it is the market
  else if ( location.pathname == '/market.phtml' ) {
    marketPathInit();
  }
  // Check if it is an item buy
  else if ( location.pathname == '/haggle.phtml' ) {
      
      // Make sure auto is on before we do anything on a haggle page
      if ( getStorage()['autoBool'] === true ) {
          hagglePathInit();
      }
      
  }
  // Check if it is wishing tree
  else if ( location.pathname == '/donations.phtml' ){
    console.log('tree');
    wishingTreePathInit();
  }
  // Check if it is the Wise Old King 
  else if (location.pathname == '/medieval/wiseking.phtml' || location.pathname == '/medieval/grumpyking.phtml'){
    kingsPathInit();
  }
  // Check if we got the donation or missed it
  else if ( location.pathname == '/takedonation_new.phtml' ){
      
      // Make sure auto is on before we do anything on a haggle page
      if ( getStorage()['autoBool'] === true ) {
          takeDonationPathInit();
      }
      
  }
  
  //console.log(location.pathname);
  
// End DOM content loaded
});
