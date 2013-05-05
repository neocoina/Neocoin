class ItemsController < ApplicationController
  require 'open-uri'
  
  # GET /items
  # GET /items.json
  def index
    @items = Item.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @items }
    end
  end
  
  def group
    # group of items
    itemPack = JSON.parse(params[:data])
   
    # Reponse array
    giftPack = [];
    
    itemPack.each do |item|
      puts item.inspect
      puts "Item: #{item['name']} Shop price: #{item['price']}"
      puts ''
      
      @item = Item.find_or_create_by_name(item['name'])
      
      # If no price set 0 or nill
      # I am removing the -1 test (Neohome)
      if !@item.price || @item.price.nil? || @item.price == 0
        @item.update_attribute(:price, nil)      
        @item.save
      elsif @item.updated_at < 48.hours.ago
        # If the price is outdated reset and check jelly  
      
        puts "Old info as of: #{@item.updated_at}"
        #puts @item.updated_at
      
        @item.update_attribute(:price, nil)
        @item.save
        #abort 'old' 
      else  
        puts 'New info'
      end
    
      # Check jelly if 0 price
      if @item.price.nil?
        item_name = URI::encode(@item.name)
        url = 'http://items.jellyneo.net/index.php?go=show_items&name=' + item_name + '&name_type=exact&desc=&cat=0&specialcat=0&status=0&rarity=0&sortby=name&numitems=1'

        response = HTTParty.get(url)
        logger.info response.body
        #puts response.body, response.code, response.message, response.headers.inspect
        if response.code == 200
          #puts 'Response Good!'
          
          # Check to see if the item was found
  		    notFound = response.body.match(/any items for your search/)
          
          unless notFound?
          
            # Match for the NP
    		    priceCheck = response.body.match(/<b>(.*?) NP<\/b>/)
            if priceCheck
              # Convert to int
              price = priceCheck[1].gsub(/,/, '').to_i
              if price != 0
                puts "New price #{price}"
                @item.price = price.to_i            
                @item.update_attribute(:price, price.to_i)
                @item.save
              elsif price == 0
                puts 'Item price is 0 on jelly meaning probably ^^ - unknown'
                puts "New price #{price}"
                floorTile = @item.name.match(/ Floor Tiles/)
        			  wallPaint = @item.name.match(/ Wall Paint/)
      			  
                if floorTile || wallPaint
        				# Log
        				logger.info  'neohome item - exclude!'
        				price = -1
        			  else
        				# Log
        				logger.info  'Did not find home match'
        				price = 0              
        			  end
   
                @item.price = price.to_i
                @item.update_attribute(:price, price.to_i)
                @item.save
              else
  				    logger.info 'Price was not found..'
					      		
  	      		floorTile = @item.name.match(/ Floor Tiles/)
        			wallPaint = @item.name.match(/ Wall Paint/)
    				
              if floorTile || wallPaint
      					# Log
      	    			logger.info  'neohome item - exclude!'
      			        price = -1
      			    else
      					# Log
      	    			logger.info  'Did not find home match'
      			    	price = 0              
      				end
					
      				#else
      				#	logger.info 'Response bad'
      		        #end
	
  				    logger.info "New price #{price}"  
  		        @item.price = price.to_i	            
  		        @item.update_attribute(:price, price.to_i)
  		        @item.save
              end
            else
  			      logger.info 'Price was not found..'
            
              #logger.info  response.body
        		  floorTile = @item.name.match(/ Floor Tiles/)
    			    wallPaint = @item.name.match(/ Wall Paint/)
        			if floorTile || wallPaint
        				# Log
        				logger.info  'neohome item - exclude!'
        	        	price = -1
        		    else
        				# Log
            			logger.info  'Did not find home match'
        		    	price = 0              
        			end
			
        			#else
        			#	logger.info 'Response bad'
        	        #end

    			    logger.info "New price #{price}"  
    	        @item.price = price.to_i	            
    	        @item.update_attribute(:price, price.to_i)
    	        @item.save
            end
          end
        else
          puts "Response bad: #{response.code}"
        end
      
      else
        puts @item.name
        puts @item.price
        
      end
      giftPack << {'name' => @item.name, 'salePrice' => @item.price, 'shopPrice' => item['price']}

    end
    
    #@itemPack = itemPack
    
    respond_to do |format|
      format.html{ render json: giftPack }
      format.json { render json: giftPack }
    end
      
  end
  
  # GET /items/1
  # GET /items/1.json
  def show
    # Downcase for consistancy
    #search_name = params[:id].downcase
    search_name = params[:id]
    @item = Item.find_or_create_by_name(search_name)
    
    # If no price set 0
    if !@item.price || @item.price.nil? || @item.price == 0
      @item.update_attribute(:price, nil)      
      @item.save
    elsif @item.updated_at < 48.hours.ago
      # If the price is outdated reset and check jelly  
      
      puts "Old info as of: #{@item.updated_at}"
      #puts @item.updated_at
      
      @item.update_attribute(:price, nil)
      @item.save
      #abort 'old' 
    else  
      puts 'New info'
    end
    
    # Check jelly if 0 price
    if @item.price.nil?
      item_name = URI::encode(@item.name)
      item_name.gsub! /\&/, "%26"
      
      url = 'http://items.jellyneo.net/index.php?go=show_items&name=' + item_name + '&name_type=exact&desc=&cat=0&specialcat=0&status=0&rarity=0&sortby=name&numitems=1'

      response = HTTParty.get(url)
      #puts response.body, response.code, response.message, response.headers.inspect
      
      # Log
      #logger.info response.body

      if response.code == 200
        #puts 'Response Good!'
        logger.info 'Response Good!'
        
        # Check to see if the item was found
		    notFound = response.body.match(/any items for your search/)
        
        unless notFound?
        
        
          # Match for the NP
  		    priceCheck = response.body.match(/<b>(.*?) NP<\/b>/)
     
          # Log
          logger.info "price check:::: #{priceCheck}"

          if priceCheck
            # Convert to int
            price = priceCheck[1].gsub(/,/, '').to_i
            if price != 0
              puts "New price #{price}"
            
            elsif price == 0
            	logger.info 'Price == 0!'
          	          		
          		floorTile = @item.name.match(/ Floor Tiles/)
      			  wallPaint = @item.name.match(/ Wall Paint/)
        			if floorTile || wallPaint
               			puts 'neohome item - exclude!'
            			logger.info  'neohome item - exclude!'
            			price = -1	            
        			else
        				puts 'Truly 0 or unknown'
        				logger.info  'Include!  WOO NOT neohome item !'
        				price = 0
        	    end
            else
            	logger.info 'Price check unknown'
              puts 'Price is unknown'
              # Check if neohome and rule as -1 price 
            	floorTile = @item.name.match(/ Floor Tiles/)
    			    wallPaint = @item.name.match(/ Wall Paint/)
        			if floorTile || wallPaint
        				# Log
        				logger.info  'neohome item - exclude!'
        	        	price = -1
        		    else
        				# Log
            			logger.info  'Did not find home match'
        		    	price = 0              
        			end
            end
          else
          	# Price check was nil
  	        # Check if neohome and rule as -1 price 
  	        floorTile = @item.name.match(/ Floor Tiles/)
        		wallPaint = @item.name.match(/ Wall Paint/)
      			if floorTile || wallPaint
      				# Log
          			logger.info  'neohome item - exclude!'
      		        price = -1
      		    else
          			logger.info  'Did not find neohome match'
      		    	price = 0              
      			end
      			logger.info "New price #{price}"  
          end
        
        end
		    puts "New price #{price}"  
		
        @item.price = price.to_i	            
        @item.update_attribute(:price, price.to_i)
        @item.save
        
      else
        puts "Response bad: #{response.code}"
      end
      
    else
      puts @item.price
    end
    
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/new
  # GET /items/new.json
  def new
    @item = Item.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @item }
    end
  end

  # GET /items/1/edit
  def edit
    @item = Item.find(params[:id])
  end

  # POST /items
  # POST /items.json
  def create
    @item = Item.new(params[:item])

    respond_to do |format|
      if @item.save
        format.html { redirect_to @item, notice: 'Item was successfully created.' }
        format.json { render json: @item, status: :created, location: @item }
      else
        format.html { render action: "new" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /items/1
  # PUT /items/1.json
  def update
    @item = Item.find(params[:id])

    respond_to do |format|
      if @item.update_attributes(params[:item])
        format.html { redirect_to @item, notice: 'Item was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @item.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /items/1
  # DELETE /items/1.json
  def destroy
    @item = Item.find(params[:id])
    @item.destroy

    respond_to do |format|
      format.html { redirect_to items_url }
      format.json { head :no_content }
    end
  end
end
