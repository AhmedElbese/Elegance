$(document).ready(function() {
    $('.color-choose input').on('click', function() {
        var selectedColor = $(this).attr('data-image');
        
        $('.left-column img').removeClass('active');
        
        $('.left-column img[data-image="' + selectedColor + '"]').addClass('active');
    });

    var QtyInput = (function () {
        var $qtyInputs = $(".qty-input");

        if (!$qtyInputs.length) {
            return;
        }

        var $inputs = $qtyInputs.find(".product-qty");
        var $countBtn = $qtyInputs.find(".qty-count");
        var qtyMin = parseInt($inputs.attr("min"));
        var qtyMax = parseInt($inputs.attr("max"));

        $inputs.change(function () {
            var $this = $(this);
            var $minusBtn = $this.siblings(".qty-count--minus");
            var $addBtn = $this.siblings(".qty-count--add");
            var qty = parseInt($this.val());

            if (isNaN(qty) || qty <= qtyMin) {
                $this.val(qtyMin);
                $minusBtn.attr("disabled", true);
            } else {
                $minusBtn.attr("disabled", false);
                
                if(qty >= qtyMax) {
                    $this.val(qtyMax);
                    $addBtn.attr('disabled', true);
                } else {
                    $this.val(qty);
                    $addBtn.attr('disabled', false);
                }
            }
        });

        $countBtn.click(function () {
            var operator = this.dataset.action;
            var $this = $(this);
            var $input = $this.siblings(".product-qty");
            var qty = parseInt($input.val());

            if (operator == "add") {
                qty += 1;
                if (qty >= qtyMin + 1) {
                    $this.siblings(".qty-count--minus").attr("disabled", false);
                }

                if (qty >= qtyMax) {
                    $this.attr("disabled", true);
                }
            } else {
                qty = qty <= qtyMin ? qtyMin : (qty -= 1);

                if (qty == qtyMin) {
                    $this.attr("disabled", true);
                }

                if (qty < qtyMax) {
                    $this.siblings(".qty-count--add").attr("disabled", false);
                }
            }

            $input.val(qty);
        });
    })();

    document.querySelector(".cart-btn").addEventListener("click", function (e) {
        e.preventDefault(); 

        const productName = document.querySelector(".product-description h1").innerText;
        const productPriceText = document.querySelector(".product-price span").innerText;
        const productPrice = parseFloat(productPriceText.replace("EGP", "").replace(",", "").trim());
        const productQty = parseInt(document.querySelector(".product-qty").value);
        const productImage = document.querySelector(".left-column img.active").getAttribute("src");

        const product = {
            name: productName,
            price: productPrice,
            quantity: productQty,
            image: productImage
        };

        localStorage.setItem("cartItem", JSON.stringify(product));

        window.location.href = "../IT-Project/cart.html";
    });
});
