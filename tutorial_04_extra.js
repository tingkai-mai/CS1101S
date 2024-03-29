// Q2
// const l = list();
// const l = list(1);
// const l = list(1, 2);
// const l = list(1,2,3);
const l = list(1,2,3,4);
// const l = list(1,2,3,4,5);
// const l = list("a", "x", "b", "y", "c", "z", "d");

function every_second(items) {
    return is_null(items) || length(items) <= 1
            ? null
            : pair(head(tail(items)),
                    every_second(tail(tail(items))));
}

function every_first(items) {
    return is_null(items)
            ? null
            : length(items) === 1
            ? pair(head(items), null)
            : pair(head(items),
                    every_first(tail(tail(items))));
}

function sum_list(items) {
    return is_null(items)
            ? 0
            : head(items) + sum_list(tail(items));
}

function sums(items) {
    return pair(sum_list(every_first(items)),
                pair(sum_list(every_second(items)), 
                    null));
}

function sums_recur(items) {
    return is_null(items)
            ? pair(0, pair(0, null))
            : length(items) === 1
                ? pair(head(items), pair(0, null))
                : pair(head(sums_recur(tail(tail(items)))) + head(items),
                        pair(head(tail(sums_recur(tail(tail(items))))) + head(tail(items)),
                            null));
}

function sums_cleaner(items) {
    if (is_null(items)) {
        return pair(0, pair(0, null));
    } else if (length(items) === 1) {
        return pair(head(items), pair(0, null));
    } else {
        const wishful = sums_cleaner(tail(tail(items)));
        return pair(head(wishful) + head(items),
                    pair(head(tail(wishful)) + head(tail(items)),
                        null));
    }
}

function sums_iter(items) {
    function inner_sum(a, b, items) {
        if (length(items) <= 1) {
            const even_sum = tail(a) ? head(a) : head(b);
            const odd_sum = !tail(a) ? head(a) : head(b);
            return pair(even_sum, pair(odd_sum, null));
        } else {
            return inner_sum(b, 
                            pair(head(a) + head(items), tail(a)),
                            tail(items));
        }
    }
    
    return inner_sum(pair(0, true),
                    pair(0, false),
                    items);
}

// sums_recur(l);
// every_first(l);
// every_second(l);
// sum(l);
// sums_cleaner(l);
// sums_iter(l);
