var app = app || {

	init: function(){

		app.share();
		//app.show_video();
		app.navigation();

	},

	navigation: function(){

		$("section").mouseenter(function(){
			var id = $(this).attr('id');
			$('a').removeClass('active');
			$("[href=#"+id+"]").addClass('active');
		});

		$("section").on("touchmove", function(){
			var id = $(this).attr('id');
			$('a').removeClass('active');
			$("[href=#"+id+"]").addClass('active');
		});

	},

	show_video: function(){

		$("#featured-video").find(".fv__overlay, .fv__play-btn").on("click", function(){
			$(".fv__overlay, .fv__play-btn").addClass("is-hidden");
		});

	},

	share: function(){

		$(".icon-twitter").on("click", function(){

			var tweet = "Baltimore is one of the most lethal cities in the United States. How did we get there?"; //Tweet text
			var url = "http://data.baltimoresun.com/news/shoot-to-kill/"; //Interactive URL

			var twitter_url = "https://twitter.com/intent/tweet?text="+tweet+"&url="+url+"&tw_p=tweetbutton";
			window.open(twitter_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

		$(".icon-facebook").on("click", function(){

			var picture = "http://data.baltimoresun.com/news/shoot-to-kill/dist/images/social-thumb.png"; //Picture URL
			var title = "Shoot to Kill"; //Post title
			var description = "Baltimore is one of the most lethal cities in the United States. How did we get there?"; //Post description
			var url = "http://data.baltimoresun.com/news/shoot-to-kill/"; //Interactive URL

	    	var facebook_url = "https://www.facebook.com/dialog/feed?display=popup&app_id=310302989040998&link="+url+"&picture="+picture+"&name="+title+"&description="+description+"&redirect_uri=http://www.facebook.com";    		
			window.open(facebook_url, 'mywin','left=200,top=200,width=500,height=300,toolbar=1,resizable=0'); return false;

		});

	}
	
}


var video_grid = video_grid || {

	init: function(){

		video_grid.update_spotlight();
		video_grid.expand_btn();
		video_grid.spotlight_btns();
		video_grid.mobile_dropdown();

		video_grid.load_info("narmin-aleethawi");

	},

	expand_grid: function(spotlight_ready){

		//Show all portraits
		$(".vg__portraits-row").addClass("is-visible");

		//Hide "expand" button
		$(".vg__expand-btn").addClass("is-hidden");

		//Extend grid's padding to accomodate spotlight, if requested
		if (spotlight_ready){
			$(".vg__portraits").addClass("is-spotlight-ready");
		}

	},

	expand_btn: function(){

		$(".vg__expand-btn").on("click", function(){
			video_grid.expand_grid(false);
		});

	},

	update_spotlight: function(){

		$(".vg__portrait").on("click", function(){			

			if (!$(this).hasClass("is-selected")){

				//Initial expansion of grid
				video_grid.expand_grid(true);
				
				//Toggle is-selected class
				$(".vg__portrait").removeClass("is-selected");
				$(this).addClass("is-selected");

				//Only shift the selected row and those beneath it
				$(".vg__portraits-row").removeClass("is-shifted");
				$(this).parent().addClass("is-shifted");
				$(this).parent().nextAll().addClass("is-shifted");

				//Move spotlight to correct position
				var selected_row = $(this).parent().data("row");
				$(".vg__spotlight").attr("class","vg__spotlight is-visible").addClass("is-row-"+selected_row);

				//Scroll back to video player
				// setTimeout(function(){					
				// 	$.scrollTo(".vg__spotlight", 300);
				// }, 550)

				//Load kid's info by passing data-kid value
				video_grid.load_info($(this).data("kid"));

				//Update mobile dropdown for consistency's sake
				video_grid.update_mobile_dropdown($(this).data("kid"));

			} else {

				/* This functionality lets the user close the spotlight by clicking the already selected person. Necessary?
				
				//Remove is-selected class
				$(this).removeClass("is-selected");

				//Unshift the rows
				$(".vg__portraits-row").removeClass("is-shifted");

				//Hide spotlight
				$(".vg__spotlight").removeClass("is-visible");

				//Reduce grid padding 
				$(".vg__portraits").removeClass("is-spotlight-ready");


				*/

				
			}
		

		});

	},

	update_video_src: function(src){

		//Update video player src
		$(".vg__spotlight__video iframe").attr("src","https://player.vimeo.com/video/"+src+"?color=ffffff");
		
	},
	
	spotlight_btns: function(){

		//Update the video's language when a button is clicked
		$(".vg__spotlight__btn").on("click", function(){

			//Update video player source by grabbing video id attached to language button via data-src
			video_grid.update_video_src($(this).attr("data-src"));

			//Update styles
			$(".vg__spotlight__btn").removeClass("is-selected");
			$(this).addClass("is-selected");			

		});

	},

	mobile_dropdown: function(){

		$(".vg__spotlight__mobile-dropdown select").on("change", function(){
			
			var kid = $(this).val();

			//Load info of kid chosen in dropdown
			video_grid.load_info(kid);

			//For consistency's sake, we'll update which desktop thumbnail is selected
			$(".vg__portrait").removeClass("is-selected");
			$(".vg__portrait[data-kid='"+kid+"']").addClass("is-selected");		

		});

	},

	update_mobile_dropdown: function(id){

		$(".vg__spotlight__mobile-dropdown select").val(id);

	},

	load_info: function(id){

		//Retrieve info based on the kid's id
		var info = $.grep(video_grid.kids, function(e){
				return (e.id === id)
			});

		//Update name, age, language and country
		$(".vg__spotlight__name").text(info[0].name);
		$(".vg__spotlight__age span").text(info[0].age);
		$(".vg__spotlight__country span").text(info[0].country);
		$(".vg__spotlight__language span").text(info[0].language);

		//Update data-src attribute on the video language buttons with chosen kid's video ids for easy toggling
		$(".vg__spotlight__btn--english").attr("data-src",info[0].video_english);
		$(".vg__spotlight__btn--other").attr("data-src",info[0].video_other);
		
		//Update video player with chosen kid's Native language video
		video_grid.update_video_src(info[0].video_other);

		//Reset video language buttons to reflect Native language video is playing
		$(".vg__spotlight__btn").removeClass("is-selected");
		$(".vg__spotlight__btn--other").addClass("is-selected");

		//Update second language button with the language's name
		$(".vg__spotlight__btn--other span").text(info[0].language);

	},

	kids: [
		{"id":"exel-estrada","name":"Exel Estrada","age":17,"country":"Guatemala","language":"Spanish","video_other":138646014,"video_english":138646258},
		{"id":"carlotta","name":"Carlotta","age":17,"country":"Italy","language":"Italian","video_other":138655153,"video_english":138655552},
		{"id":"faraz-nadeem","name":"Faraz Nadeem","age":17,"country":"Pakistan","language":"Urdu","video_other":138648674,"video_english":138648868},
		{"id":"fayza-al-halabi","name":"Fayza Al Halabi","age":17,"country":"Syria","language":"Arabic","video_other":138642374,"video_english":138642747},
		{"id":"franck-kibinda","name":"Franck Kibinda","age":15,"country":"Democratic Republic of the Congo","language":"French","video_other":138659837,"video_english":138659838},
		{"id":"franklin-aguilar","name":"Franklin Aguilar","age":20,"country":"El Salvador","language":"Spanish","video_other":138659101,"video_english":138659971},
		{"id":"karen-abuel","name":"Karen Abuel","age":15,"country":"Philippines","language":"Tagalog","video_other":138658693,"video_english":138658824},
		{"id":"kibra-buluts","name":"Kibra Buluts","age":16,"country":"Ethiopia","language":"Tigrignya","video_other":138647285,"video_english":138647465},
		{"id":"maria-lourenco","name":"Maria Lourenco","age":"Unknown","country":"Angola","language":"Portuguese","video_other":138655835,"video_english":138656760},
		{"id":"mona-al-halabi","name":"Mona Al Halabi","age":16,"country":"Syria","language":"Arabic","video_other":138646783,"video_english":138647080},
		{"id":"monique-ngomba","name":"Monique Ngomba","age":16,"country":"Central African Republic","language":"Sango","video_other":138658990,"video_english":138641808},
		{"id":"mussa-alenga","name":"Mussa Alenga","age":17,"country":"Tanzania","language":"Swahili","video_other":138657396,"video_english":138657935},
		{"id":"nan-wang","name":"Nan Wang","age":18,"country":"China","language":"Mandarin, Shangai dialect","video_other":138653563,"video_english":138653857},
		{"id":"nar-bahadur-darjee","name":"Nar Bahadur Darjee","age":18,"country":"Nepal","language":"Nepali","video_other":138647646,"video_english":138647777},
		{"id":"narmin-aleethawi","name":"Narmin Al Eethawi","age":19,"country":"Iraq","language":"Arabic","video_other":138659575,"video_english":138659574},
		{"id":"norma-argueta","name":"Norma Argueta","age":18,"country":"El Salvador","language":"Spanish","video_other":138653022,"video_english":138653173},
		{"id":"reema-alfaheed","name":"Reema Alfaheed","age":17,"country":"Palestine, Iraq","language":"Arabic","video_other":138645548,"video_english":138645763},
		{"id":"tina-lin","name":"Tina Lin","age":17,"country":"China","language":"Mandarin","video_other":138649227,"video_english":138652895},
		{"id":"vigueur-kibinda","name":"Vigueur Kibinda","age":17,"country":"Democratic Republic of the Congo","language":"French","video_other":138646443,"video_english":138646585},
		{"id":"yonas-fishaye","name":"Yonas Fishaye","age":17,"country":"Ethiopia","language":"Tigrignya/Amharic","video_other":138648195,"video_english":138648460}
	]

}


var gallery_app = gallery_app || {

	init: function(){

		gallery_app.open();
		gallery_app.close();
		gallery_app.arrow_events();
		gallery_app.update_caption(1);
		gallery_app.toggle_caption();

	},

	current_slide: 1,
	max_slides: 24,

	open: function(){

		$("btn.inline-media--pic__open-gallery").on("click", function(){
			$(".overlay, #gallery").addClass("is-visible");
		});

	},

	close: function(){

		$("#gallery").find("div.gallery__control--close").on("click", function(){
			$(".overlay, #gallery").removeClass("is-visible");
		});

		$("div.overlay").on("click", function(){
			$(".overlay, #gallery").removeClass("is-visible");
		});

	},

	arrow_events: function(){

		$("#gallery").find("div.gallery__control--slide").on("click", function(){
			gallery_app.update_slide($(this).data("dir"));
		});

	},

	update_slide: function(dir){

		//Increment, decrement or stay static depend on direction and limit
		if (dir === "left"){
			gallery_app.current_slide--;
		} else if (dir === "right") {
			gallery_app.current_slide++;
		}

		//Loop the slides
		if (gallery_app.current_slide < 1){
			gallery_app.current_slide = gallery_app.max_slides;
		} else if (gallery_app.current_slide > gallery_app.max_slides){
			gallery_app.current_slide = 1;
		}

		//Update the slider position
		var new_position = ((gallery_app.current_slide - 1) * -100) + "%";
		$("#gallery").find("div.gallery__photos").css("left",new_position);

		//Update current number indicator
		$("#gallery__current-img").text(gallery_app.current_slide);

		//Update progress bar
		var width = (gallery_app.current_slide - 1) * (100 / (gallery_app.max_slides - 1));
		$("#gallery").find("div.gallery__progress-bar").css("width",width+"%");

		//Update caption
		gallery_app.update_caption(gallery_app.current_slide);

	},

	toggle_caption: function(){

		$("#gallery").find("div.gallery__toggle-caption div").on("click", function(){

			//Update hide/show language
			$(this).parent().toggleClass("is-active");

			//Toggle caption visibility
			$("#gallery").find("div.gallery__caption").toggleClass("is-visible");

		});

	},

	update_caption: function(slide){

		$("#gallery").find("div.gallery__caption").html(gallery_app.captions[slide-1]);

	},

	captions: ["Narmin thought sometimes that Reema acted like a little girl, as though she was making up for her lost childhood. Reema had endured a lot. Through a translator, her parents explained that they were targeted in Iraq because her father was Palestinian.","Narmin thought sometimes that Reema acted like a little girl, as though she was making up for her lost childhood. Reema had endured a lot. Through a translator, her parents explained that they were targeted in Iraq because her father was Palestinian.","Narmin thought sometimes that Reema acted like a little girl, as though she was making up for her lost childhood. Reema had endured a lot. Through a translator, her parents explained that they were targeted in Iraq because her father was Palestinian."]

}



$(document).ready(function(){
	app.init();
	// video_grid.init();
	// gallery_app.init();
});
