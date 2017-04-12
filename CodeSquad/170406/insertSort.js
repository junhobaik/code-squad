for (var a = [], i = 0; i < 10; ++i) a[i] = i;

function shuffle(array) {
    var tmp, current, top = array.length;
    if (top)
        while (--top) {
            current = Math.floor(Math.random() * (top + 1));
            tmp = array[current];
            array[current] = array[top];
            array[top] = tmp;
        }
    return array;
}
a = shuffle(a);

document.write("Original Array : [", a, "]<br><br>");

function swapper(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
    return arr;
}

function print(arr, i) {
    if (arguments[1] != undefined) {
        document.write(i, ": [", arr, "]<br>");
    } else {
        document.write("arr : [", arr, "]<br>");
    }

}

function insertSort(arr) {
    var len = arr.length;
    var temp, inner, outter;

    for (outter = 1; outter < len; outter++) {
        document.write("- outter: ", outter, "<br>");
        print(arr);
        temp = arr[outter];
        inner = outter - 1;

        while (inner >= 0 && arr[inner] > temp) {
            print(arr, "inner ");
            arr[inner + 1] = arr[inner];
            print(arr, "inner ");
            inner--;
        }

        arr[inner + 1] = temp
        print(arr);
        document.write("<br>");
    }
    return arr;
}
insertSort(a);