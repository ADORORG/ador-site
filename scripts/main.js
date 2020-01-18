document.addEventListener("DOMContentLoaded", function() {
	attachFaqToDocumentBody();
	mainMenuCollapse();
	scrollToTarget();
	faqCollapseToggle();

	window.addEventListener('scroll', isVisible);
	window.addEventListener('resize', isVisible);
	window.dispatchEvent(( new Event('scroll')));

})

function mainMenuCollapse() {
	var burger = document.querySelector(".burger");

	burger.addEventListener("click", function(e) {
		var target = e.currentTarget;
		var menuId = target.getAttribute("data-target");
		var menu = document.getElementById(menuId);

		target.classList.toggle("is-active");
		menu.classList.toggle("is-active");
	})
} 

function scrollToTarget() {
	var anchors = document.querySelectorAll(".scroll");

	anchors.forEach(function(anchor) {
		anchor.addEventListener("click", animateScroll)
	})
}

function animateScroll(e) {
	var element = e.currentTarget;
	var targetId = element.getAttribute("data-href");
	var target = document.querySelector(targetId);

	if (target && "scrollIntoView" in target) {
		e.preventDefault();
		target.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
	}
}

function attachFaqToDocumentBody() {
	var faqs = [
		{
			question: "What is Ador?",
			answer: "ADOR is the manifestaion of GOODS & SERVICES reimagined for the 21st century. "
		},
		{
			question: "How does it work?",
			answer: "Simply put. A COMPANY, CREATIVE and CONSUMER can now BUY, SELL and TRADE just about any item; virtually."
		},
		{
			question: "When is beta testing?",
			answer: "We will Launch our ALPHA BUILD Q3 2020. And Beta testing will start shortly after in 2021."
		},
		{
			question: "Why build a digital economy?",
			answer: "We see a major need for AUTHENTICY & CONNECTIVITY in the global markets, blockchain finally allows this to be possible."
		},
		{
			question: "Is this secure?",
			answer: "With open sourced tech and a decentralized power structure; you better believe this is."
		},
		{
			question: "How can I earn?",
			answer: "There are various ways to be rewarded with our platform. From inviting friends to to daily pooled winnings. We will launch LENDING & STAKING Q4 2021"
		}
	]
	var faqsContainer = document.querySelector("#faq .columns");

	var fragment = document.createDocumentFragment();
	
	faqs.forEach(function(faq) {
		var column = document.createElement("div");
		column.classList.add("column", "is-5");

		var content = `
				<h6 class="button is-radiusless full-width collapsible">
					<span class="is-pulled-left">${faq.question}</span>
					<span class="is-pulled-right icon-angle-down"></span>
				</h6>
				<p class="is-hidden notification is-white pr-2 pl-2 pt-2 pb-2 br-1 bl-1 bb-1">
					${faq.answer}
				</p>
		`;
		column.innerHTML = content;
		fragment.appendChild(column);
	})

	faqsContainer.appendChild(fragment);
}


function faqCollapseToggle() {
	var faqs = document.querySelectorAll("#faq .collapsible");

	faqs.forEach(function(faq) {
		faq.addEventListener("click", function(e) {
			var target = e.currentTarget;

			var icon = target.querySelector(".is-pulled-right");

			if (icon.classList.contains("icon-angle-down")) {
				icon.classList.remove("icon-angle-down");
				icon.classList.add("icon-angle-up");
			} else {
				icon.classList.remove("icon-angle-up");
				icon.classList.add("icon-angle-down");
			}
			/*
			* Toggle hidden in faq answers
			*/
			target.nextElementSibling.classList.toggle("is-hidden");
		})
	})
}

function isVisible() {
	var animation_elements = document.querySelectorAll('.animatable');
  	animation_elements.forEach(function(element) {
		if (checkVisible(element)) {
	      	element.classList.remove('animatable');
	      	element.classList.add('animated');   
	    } else {
	    	element.classList.remove('animated');
	      	element.classList.add('animatable');	      	
	    }
  	})
}

function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}
