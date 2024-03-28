var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("cvt-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  let labelContent = selElmnt.getAttribute('data-cvt-label-border') || " ";
  x[i].style.setProperty('--label-content', `"${labelContent}"`);
  a = document.createElement("DIV");
  a.setAttribute("class", "select-cvt-selected");
  a.setAttribute("tabindex", "0");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-cvt-items select-cvt-hide");


  var shouldInsertSearchBox = selElmnt.getAttribute("data-cvt-input-select");
  shouldInsertSearchBox = shouldInsertSearchBox === null || shouldInsertSearchBox.toLowerCase() === "true";

  if (shouldInsertSearchBox) {
    var searchWrapper = document.createElement("DIV");
    searchWrapper.setAttribute("class", "cvt-form-group");

    var uniqueSearchBoxId = "searchInput-" + i;
    var searchBox = document.createElement("INPUT");
    searchBox.setAttribute("type", "search");
    searchBox.setAttribute("id", uniqueSearchBoxId);
    searchBox.setAttribute("aria-describedby", "inputGroup-sizing-sm");
    searchBox.setAttribute("autocomplete", "off");

    var searchLabel = document.createElement("LABEL");
    searchLabel.setAttribute("for", uniqueSearchBoxId);
    searchLabel.textContent = "Recherche...";

    searchWrapper.appendChild(searchBox);
    searchWrapper.appendChild(searchLabel);

    b.appendChild(searchWrapper);

    searchBox.oninput = function() {
      var filter = this.value.toUpperCase();
      var divs = this.parentNode.parentNode.getElementsByTagName("DIV");
    
      for (var i = 2; i < divs.length; i++) { 
        var txtValue = divs[i].textContent || divs[i].innerText;
        var regex = new RegExp("^" + filter, "i");
    
        if (txtValue.search(regex) > -1 || this.value === "") {
          divs[i].style.display = "";
        } else {
          divs[i].style.display = "none";
        }
      }
    };
    
    searchBox.addEventListener("click", function (e) {
      e.stopPropagation();
    });
  }


  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("cvt-same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "cvt-same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    e.stopPropagation();
    var items = this.nextSibling;
    if (items.classList.contains("select-cvt-show")) {
      items.classList.remove("select-cvt-show");
      setTimeout(() => items.style.display = "none", 300);
    } else {
      items.style.display = "block";
      requestAnimationFrame(() => items.classList.add("select-cvt-show"));
    }
    this.classList.toggle("select-cvt-arrow-active");
  });

}

function closeAllSelect(elmnt) {
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-cvt-items");
  y = document.getElementsByClassName("select-cvt-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-cvt-arrow-active");
    }
  }
  var x = document.getElementsByClassName("select-cvt-items");
  for (var i = 0; i < x.length; i++) {
    if (x[i].classList.contains("select-cvt-show")) {
      x[i].classList.remove("select-cvt-show");
      setTimeout(() => x[i].style.display = "none", 300);
    }
  }
}

document.addEventListener("click", closeAllSelect);