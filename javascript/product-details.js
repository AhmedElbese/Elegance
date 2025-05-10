$(document).ready(function() {
    // تغيير الصورة بناءً على اللون المحدد
    $('.color-choose input').on('click', function() {
        var selectedColor = $(this).attr('data-image');
        
        // إزالة الكلاس active من الصور الأخرى
        $('.left-column img').removeClass('active');
        
        // إضافة الكلاس active للصورة المحددة
        $('.left-column img[data-image="' + selectedColor + '"]').addClass('active');
    });

    // التعامل مع اختيار الكمية (quantity)
    var QtyInput = (function () {
        var $qtyInputs = $(".qty-input");

        if (!$qtyInputs.length) {
            return;
        }

        var $inputs = $qtyInputs.find(".product-qty");
        var $countBtn = $qtyInputs.find(".qty-count");
        var qtyMin = parseInt($inputs.attr("min"));
        var qtyMax = parseInt($inputs.attr("max"));

        // التحقق من الكمية المدخلة
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

        // التعامل مع الضغط على أزرار (+) و (-)
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

    // إضافة المنتج إلى السلة
    document.querySelector(".cart-btn").addEventListener("click", function (e) {
        e.preventDefault(); // لمنع تحميل الصفحة عند الضغط

        // جلب بيانات المنتج
        const productName = document.querySelector(".product-description h1").innerText;
        const productPriceText = document.querySelector(".product-price span").innerText;
        const productPrice = parseFloat(productPriceText.replace("EGP", "").replace(",", "").trim());
        const productQty = parseInt(document.querySelector(".product-qty").value);
        const productImage = document.querySelector(".left-column img.active").getAttribute("src");

        // إنشاء كائن يمثل المنتج
        const product = {
            name: productName,
            price: productPrice,
            quantity: productQty,
            image: productImage
        };

        // تخزينه في localStorage (يمكنك لاحقًا دعم أكثر من منتج باستخدام مصفوفة)
        localStorage.setItem("cartItem", JSON.stringify(product));

        // الانتقال إلى صفحة السلة
        window.location.href = "../IT-Project/cart.html";
    });
});
