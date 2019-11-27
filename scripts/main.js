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
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Gravida in fermentum et sollicitudin ac orci phasellus egestas. At tellus at urna condimentum mattis pellentesque. Senectus et netus et malesuada. Amet purus gravida quis blandit turpis cursus in hac habitasse. "
		},
		{
			question: "How does it work?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Gravida in fermentum et sollicitudin ac orci phasellus egestas. At tellus at urna condimentum mattis pellentesque. Senectus et netus et malesuada. Amet purus gravida quis blandit turpis cursus in hac habitasse. "
		},
		{
			question: "When is beta testing?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Gravida in fermentum et sollicitudin ac orci phasellus egestas. At tellus at urna condimentum mattis pellentesque. Senectus et netus et malesuada. Amet purus gravida quis blandit turpis cursus in hac habitasse. "
		},
		{
			question: "Why virtual identity?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Gravida in fermentum et sollicitudin ac orci phasellus egestas. At tellus at urna condimentum mattis pellentesque. Senectus et netus et malesuada. Amet purus gravida quis blandit turpis cursus in hac habitasse. "
		},
		{
			question: "Is this secure?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Gravida in fermentum et sollicitudin ac orci phasellus egestas. At tellus at urna condimentum mattis pellentesque. Senectus et netus et malesuada. Amet purus gravida quis blandit turpis cursus in hac habitasse. "
		},
		{
			question: "How can I earn?",
			answer: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna. Gravida in fermentum et sollicitudin ac orci phasellus egestas. At tellus at urna condimentum mattis pellentesque. Senectus et netus et malesuada. Amet purus gravida quis blandit turpis cursus in hac habitasse. "
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
