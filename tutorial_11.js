// Scale each element in a given stream by a given factor
function scale_stream(c, stream) {
    return stream_map(x => c * x, stream);
}

// Essentially calculates 2^n where n is the depth of the stream traversed
// const A = pair(1, () => scale_stream(2, A)); // Call stream_tail() on A
// const A = pair(1, scale_stream(2, A));
// const A = pair(1, stream_map(x => 2*x, A));
// const A = pair(1, pair(2, () => stream_map(x => 2*x, stream_tail(A))));
// const A = pair(1, pair(2, () => stream_map(x => 2*x, pair(2, () => scale_stream(A))))); // Call stream_tail()
// const A = pair(1, pair(2, stream_map(x => 2*x, pair(2, () => scale_stream(A)))));
// const A = pair(1, pair(2, pair(4, () => stream_map(x => 2*x, stream_tail(A)))));

// Takes two streams, returns a stream where each element is the multiplication of the two streams
function mul_streams(a,b) {
    return pair(head(a) * head(b),
                () => mul_streams(stream_tail(a), stream_tail(b)));
}


// B takes the previous result and multiplies it by x, where x is the position of the stream
// const integers = integers_from(1);
// const B = pair(1, () => mul_streams(B, integers));
// eval_stream(B, 7);

function add_streams(s1, s2) {
    return is_null(s1)
    ? s2
    : is_null(s2)
        ? s1
        : pair(head(s1) + head(s2),
        () => add_streams(stream_tail(s1),
                        stream_tail(s2)));
}

const add_series = add_streams;
const scale_series = scale_stream;
const non_neg_integers = integers_from(0);

function negate_series(s) {
    return scale_series(-1, s);
}
function subtract_series(s1, s2) {
    return add_series(s1, negate_series(s2));
}

function coeffs_to_series(list_of_coeffs) {
    const zeros = pair(0, () => zeros);
    function iter(list) {
        return is_null(list)
            ? zeros
            : pair(head(list),
            () => iter(tail(list)));
    }
    return iter(list_of_coeffs);
}

function fun_to_series(fun) {
    return stream_map(fun, non_neg_integers);
}

const alt_ones = pair(1, () => negate_series(alt_ones));
// const alt_ones = pair(1, 
//                     () => pair(-1, 
//                                 () => alt_ones));
eval_stream(alt_ones, 5);

const zeroes = add_streams(alt_ones, stream_tail(alt_ones));
eval_stream(zeroes, 5);

const s1 = n => fun_to_series(x => math_pow(n, x)); // Accepts value of x
const s1_res = eval_stream(s1(3), 4); 
display("s1_res: " + stringify(s1_res));
// Get sum of s1
const s1_sum = accumulate((x, y) => x+y, 0, s1_res); // 1 + 3 + 3^2 + 3^3
display("s1_sum: " + stringify(s1_sum));

const s2 = n => fun_to_series(x => (x+1) * math_pow(n, x));
const s2_res = eval_stream(s2(3), 4);
display("s2_res: " + stringify(s2_res));
// Get sum of s2
const s2_sum = accumulate((x, y) => x+y, 0, s2_res); // 1 + 2(3) + 3(3^2) + 4(3^3)
display("s2_sum: " + stringify(s2_sum));
