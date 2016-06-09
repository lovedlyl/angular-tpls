(defun fac (n)
  (if (n<=1) (* n (- n 1)))
  )

(format nil "%d" (fac 100))