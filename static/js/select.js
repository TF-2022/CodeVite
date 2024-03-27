var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("cvt-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  a = document.createElement("DIV");
  a.setAttribute("class", "select-cvt-selected");
  a.setAttribute("tabindex", "0");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  b = document.createElement("DIV");
  b.setAttribute("class", "select-cvt-items select-cvt-hide");
  for (j = 1; j < ll; j++) {
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function(e) {
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
  a.addEventListener("click", function(e) {
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