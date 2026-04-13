function step(array, comparing = [], swapping = [], sorted = [], isSwap = false) {
  return { array: [...array], comparing, swapping, sorted, isSwap }
}

// BUBBLE SORT --------------------------

export function* bubbleSortGen(input) {
  const a = [...input]
  const n = a.length
  const sorted = []

  for (let i = 0; i < n - 1; i++) {
    let swapped = false
    for (let j = 0; j < n - 1 - i; j++) {
      yield step(a, [j, j + 1], [], sorted, false)
      if (a[j] > a[j + 1]) {
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swapped = true
        yield step(a, [], [j, j + 1], sorted, true)
      }
    }
    sorted.unshift(n - 1 - i)
    if (!swapped) break
  }
  sorted.unshift(0)
  yield step(a, [], [], Array.from({ length: n }, (_, i) => i), false)
}

// INSERTION SORT --------------------------

export function* insertionSortGen(input) {
  const a = [...input]
  const n = a.length

  for (let i = 1; i < n; i++) {
    let j = i
    while (j > 0) {
      yield step(a, [j - 1, j], [], [], false)
      if (a[j - 1] > a[j]) {
        ;[a[j - 1], a[j]] = [a[j], a[j - 1]]
        yield step(a, [], [j - 1, j], [], true)
        j--
      } else {
        break
      }
    }
  }
  yield step(a, [], [], Array.from({ length: n }, (_, i) => i), false)
}

// MERGE SORT --------------------------

function* mergeGen(a, left, mid, right) {
  const L = a.slice(left, mid + 1)
  const R = a.slice(mid + 1, right + 1)
  let i = 0, j = 0, k = left

  while (i < L.length && j < R.length) {
    yield step(a, [left + i, mid + 1 + j], [], [], false)
    if (L[i] <= R[j]) {
      a[k] = L[i++]
    } else {
      a[k] = R[j++]
    }
    yield step(a, [], [k], [], true)
    k++
  }
  while (i < L.length) {
    a[k] = L[i++]
    yield step(a, [], [k], [], true)
    k++
  }
  while (j < R.length) {
    a[k] = R[j++]
    yield step(a, [], [k], [], true)
    k++
  }
}

function* mergeSortGen_(a, left, right) {
  if (left >= right) return
  const mid = Math.floor((left + right) / 2)
  yield* mergeSortGen_(a, left, mid)
  yield* mergeSortGen_(a, mid + 1, right)
  yield* mergeGen(a, left, mid, right)
}

export function* mergeSortGen(input) {
  const a = [...input]
  yield* mergeSortGen_(a, 0, a.length - 1)
  yield step(a, [], [], Array.from({ length: a.length }, (_, i) => i), false)
}

// QUICK SORT --------------------------

function* quickSortGen_(a, low, high) {
  if (low >= high) return

  const pivot = a[high]
  let i = low - 1

  for (let j = low; j < high; j++) {
    yield step(a, [j, high], [], [], false)
    if (a[j] <= pivot) {
      i++
      if (i !== j) {
        ;[a[i], a[j]] = [a[j], a[i]]
        yield step(a, [], [i, j], [], true)
      }
    }
  }
  ;[a[i + 1], a[high]] = [a[high], a[i + 1]]
  yield step(a, [], [i + 1, high], [], true)

  const pi = i + 1
  yield* quickSortGen_(a, low, pi - 1)
  yield* quickSortGen_(a, pi + 1, high)
}

export function* quickSortGen(input) {
  const a = [...input]
  yield* quickSortGen_(a, 0, a.length - 1)
  yield step(a, [], [], Array.from({ length: a.length }, (_, i) => i), false)
}

// ALGORITHMS REGISTRY --------------------------

export const ALGORITHMS = {
  bubble: {
    id: 'bubble',
    name: 'Bubble Sort',
    tagline: '"Gossip that eventually settles the room."',
    description:
      'Repeatedly compares adjacent elements and swaps them if they\'re in the wrong order. Each pass bubbles the largest unsorted element to its final position.',
    personality: 'Chaotic Good',
    craftsmanshipRating: 2,
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    adaptive: true,
    method: 'Exchanging',
    color: 'hsl(330, 72%, 56%)',
    accentColor: 'hsl(330, 72%, 92%)',
    gen: bubbleSortGen,
    analogy:
      'Think of it like sorting a hand of cards by swapping neighbours over and over until the deck calms down - dramatic, inefficient, but weirdly satisfying.',
    howItWorks: [
      'Start at the beginning of the array.',
      'Compare each pair of adjacent elements.',
      'Swap them if the left one is bigger.',
      'After each full pass, the largest unsorted element has "bubbled" to its correct position.',
      'Repeat for the remaining unsorted portion.',
      'Optimised version: exit early if no swaps occurred in a pass (already sorted!).',
    ],
    whenToUse: [
      'Tiny datasets where simplicity beats performance.',
      'When you need a dead-simple implementation.',
      'Teaching purposes — easiest to visualise and explain.',
    ],
    whenToAvoid: [
      'Any dataset with n > ~50.',
      'Performance-critical applications.',
      'When you have better alternatives (you always do).',
    ],
    examTip:
      'Bubble sort is O(n) best case ONLY with the early-exit optimisation. Without it, it\'s always O(n²). Examiners love testing this.',
    funFact:
      'The name "bubble sort" comes from the way larger elements "bubble up" to the top of the list. It was first mentioned in a 1956 paper and has been the go-to teaching algorithm ever since.',
    vibeCheck: 'That friend who solves everything by talking it out. Takes forever, but somehow endearing.',
    code: {
      python: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False  # optimised version
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break  # already sorted — exit early!
    return arr`,
      java: `public static void bubbleSort(int[] arr) {
    int n = arr.length;
    for (int i = 0; i < n - 1; i++) {
        boolean swapped = false;
        for (int j = 0; j < n - 1 - i; j++) {
            if (arr[j] > arr[j + 1]) {
                int temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                swapped = true;
            }
        }
        if (!swapped) break; // early exit
    }
}`,
      pseudo: `BUBBLE-SORT(A):
  n = length(A)
  FOR i = 0 TO n-2:
    swapped = false
    FOR j = 0 TO n-2-i:
      IF A[j] > A[j+1]:
        SWAP A[j] AND A[j+1]
        swapped = true
    IF NOT swapped:
      BREAK  ← early exit optimisation
  RETURN A`,
    },
  },

  insertion: {
    id: 'insertion',
    name: 'Insertion Sort',
    tagline: '"One card at a time, placed exactly right."',
    description:
      'Builds the sorted array one element at a time by inserting each new element into its correct position among the already-sorted portion.',
    personality: 'Meticulous Perfectionist',
    craftsmanshipRating: 3,
    timeComplexity: { best: 'O(n)', average: 'O(n²)', worst: 'O(n²)' },
    spaceComplexity: 'O(1)',
    stable: true,
    inPlace: true,
    adaptive: true,
    method: 'Inserting',
    color: 'hsl(165, 45%, 45%)',
    accentColor: 'hsl(165, 45%, 90%)',
    gen: insertionSortGen,
    analogy:
      'Exactly like sorting a hand of playing cards: pick up each card and slide it leftward into the correct spot among the cards you\'ve already sorted.',
    howItWorks: [
      'Treat the first element as a "sorted" sub-array of size 1.',
      'Pick the next element (the "key").',
      'Compare it against the elements in the sorted portion, moving right-to-left.',
      'Shift elements that are larger than the key one position to the right.',
      'Insert the key into the gap you\'ve created.',
      'Repeat until all elements have been inserted.',
    ],
    whenToUse: [
      'Small datasets (practical for n ≤ 20–30).',
      'Nearly sorted data, O(n) in best case.',
      'Online sorting (receiving data one element at a time).',
      'As the base case in hybrid algorithms like Timsort.',
    ],
    whenToAvoid: [
      'Large datasets.',
      'When data is in reverse order (worst case).',
      'When average O(n²) is unacceptable.',
    ],
    examTip:
      'Insertion sort is the algorithm of choice for nearly-sorted data. Python\'s Timsort uses it for small sub-arrays. Always mention this in exams, it shows depth.',
    funFact:
      'Timsort — the default sort in Python and Java — uses insertion sort for small chunks (under ~64 elements), then merge sort for the rest. You\'re using insertion sort constantly without knowing it.',
    vibeCheck:
      'The student who colour-codes their notes and has already filed everything from the first lecture. Reliable, principled, quietly excellent.',
    code: {
      python: `def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        # Shift larger elements one position right
        while j >= 0 and arr[j] > key:
            arr[j + 1] = arr[j]
            j -= 1
        arr[j + 1] = key  # insert key into correct spot
    return arr`,
      java: `public static void insertionSort(int[] arr) {
    int n = arr.length;
    for (int i = 1; i < n; i++) {
        int key = arr[i];
        int j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = key;
    }
}`,
      pseudo: `INSERTION-SORT(A):
  FOR i = 1 TO length(A) - 1:
    key = A[i]
    j = i - 1
    WHILE j >= 0 AND A[j] > key:
      A[j+1] = A[j]
      j = j - 1
    A[j+1] = key
  RETURN A`,
    },
  },

  merge: {
    id: 'merge',
    name: 'Merge Sort',
    tagline: '"Divide, conquer, and look good doing it."',
    description:
      'A divide-and-conquer algorithm that splits the array in half recursively, sorts each half, then merges the two sorted halves back together.',
    personality: 'Organised Overachiever',
    craftsmanshipRating: 5,
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n log n)' },
    spaceComplexity: 'O(n)',
    stable: true,
    inPlace: false,
    adaptive: false,
    method: 'Merging',
    color: 'hsl(290, 50%, 58%)',
    accentColor: 'hsl(290, 50%, 93%)',
    gen: mergeSortGen,
    analogy:
      'Like splitting a messy pile of essays into two halves, sorting each half separately, then carefully interleaving them back in order. Methodical. Thorough. Never rushed.',
    howItWorks: [
      'Divide the array into two equal halves.',
      'Recursively sort the left half.',
      'Recursively sort the right half.',
      'Merge the two sorted halves by comparing elements from each side.',
      'The merge step picks the smaller of the two front elements each time.',
      'Base case: an array of length 0 or 1 is already sorted.',
    ],
    whenToUse: [
      'When guaranteed O(n log n) performance is needed.',
      'Sorting linked lists (merge sort shines here).',
      'External sorting (data too large for RAM - sort in chunks).',
      'When stability is required and data is large.',
    ],
    whenToAvoid: [
      'Memory-constrained environments (requires O(n) extra space).',
      'Small datasets (quicksort\'s lower constants win here).',
      'When in-place sorting is a hard requirement.',
    ],
    examTip:
      'Merge sort is the ONLY comparison-based sort that guarantees O(n log n) in all cases. Quicksort is O(n²) worst case. This distinction is a classic exam question.',
    funFact:
      'Merge sort was invented by John von Neumann in 1945 — one of the earliest sorting algorithms ever documented. It predates most computers. The man was playing on another level.',
    vibeCheck:
      'The friend who colour-codes their notes, still goes out every weekend, somehow aces every exam. Consistent. Dependable. Kind of annoyingly perfect.',
    code: {
      python: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    
    mid = len(arr) // 2
    left  = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    
    return merge(left, right)

def merge(left, right):
    result, i, j = [], 0, 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i]); i += 1
        else:
            result.append(right[j]); j += 1
    return result + left[i:] + right[j:]`,
      java: `public static int[] mergeSort(int[] arr) {
    if (arr.length <= 1) return arr;
    int mid = arr.length / 2;
    int[] left  = mergeSort(Arrays.copyOfRange(arr, 0, mid));
    int[] right = mergeSort(Arrays.copyOfRange(arr, mid, arr.length));
    return merge(left, right);
}

private static int[] merge(int[] l, int[] r) {
  int[] result = new int[l.length + r.length];
  int i = 0, j = 0, k = 0;
  while (i < l.length && j < r.length)
      result[k++] = (l[i] <= r[j]) ? l[i++] : r[j++];
  while (i < l.length) result[k++] = l[i++];
  while (j < r.length) result[k++] = r[j++];
  return result;
}`,
  pseudo: `MERGE-SORT(A):
    IF length(A) <= 1: RETURN A
    mid = floor(length(A) / 2)
    left  = MERGE-SORT(A[0..mid-1])
    right = MERGE-SORT(A[mid..n-1])
    RETURN MERGE(left, right)

    MERGE(L, R):
      result = []
      WHILE L and R not empty:
        IF L[0] <= R[0]: append L[0]; remove from L
        ELSE:            append R[0]; remove from R
      RETURN result + remaining L + remaining R`,
        },
    },

  quick: {
    id: 'quick',
    name: 'Quicksort',
    tagline: '"Fast, flashy, occasionally a disaster."',
    description:
      'Picks a pivot element and partitions the array so everything smaller goes left, everything larger goes right — then recursively sorts each partition.',
    personality: 'Chaotic Brilliant',
    craftsmanshipRating: 4,
    timeComplexity: { best: 'O(n log n)', average: 'O(n log n)', worst: 'O(n²)' },
    spaceComplexity: 'O(log n)',
    stable: false,
    inPlace: true,
    adaptive: false,
    method: 'Partitioning',
    color: 'hsl(35, 80%, 55%)',
    accentColor: 'hsl(35, 80%, 93%)',
    gen: quickSortGen,
    analogy:
      'Like organising a party guest list by putting everyone shorter than you on the left, taller on the right, then repeating for each group. Chaotic energy, surprisingly effective.',
    howItWorks: [
      'Choose a pivot element (commonly the last element).',
      'Partition: move all elements ≤ pivot to the left, all > pivot to the right.',
      'The pivot is now in its final sorted position.',
      'Recursively apply the same process to the left and right partitions.',
      'Base case: partition of size 0 or 1 is already sorted.',
      'Pivot choice dramatically affects performance - random pivot or median-of-three improves average case.',
    ],
    whenToUse: [
      'General-purpose sorting (fastest in practice for most inputs).',
      'When cache performance matters (excellent locality).',
      'When average O(n log n) and in-place are both needed.',
      'Large datasets where merge sort\'s O(n) space is too costly.',
    ],
    whenToAvoid: [
      'When worst case O(n²) is unacceptable (e.g. security-critical sorting).',
      'Nearly sorted or reverse-sorted data without randomised pivot.',
      'When stability is required (quicksort is unstable).',
    ],
    examTip:
      'Quicksort\'s worst case is O(n²) when the pivot is always the smallest or largest element (e.g. sorted array with last-element pivot). Randomising the pivot or using median-of-three fixes this in practice.',
    funFact:
      'Invented by Tony Hoare in 1959 while working on machine translation for the National Physical Laboratory. He later called it "my billion-dollar mistake". But that was for null references. Quicksort he\'s quite proud of.',
    vibeCheck:
      'The genius who never studies but somehow gets top marks. 90% of the time. The other 10% is a cautionary tale.',
    code: {
      python: `def quicksort(arr, low=0, high=None):
    if high is None: high = len(arr) - 1
    if low < high:
        pi = partition(arr, low, high)
        quicksort(arr, low, pi - 1)
        quicksort(arr, pi + 1, high)

def partition(arr, low, high):
    pivot = arr[high]
    i = low - 1
    for j in range(low, high):
        if arr[j] <= pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]
    arr[i+1], arr[high] = arr[high], arr[i+1]
    return i + 1`,
      java: `public static void quickSort(int[] arr, int low, int high) {
    if (low < high) {
        int pi = partition(arr, low, high);
        quickSort(arr, low, pi - 1);
        quickSort(arr, pi + 1, high);
    }
}

private static int partition(int[] arr, int low, int high) {
    int pivot = arr[high], i = low - 1;
    for (int j = low; j < high; j++) {
        if (arr[j] <= pivot) {
            int tmp = arr[++i]; arr[i] = arr[j]; arr[j] = tmp;
        }
    }
    int tmp = arr[i+1]; arr[i+1] = arr[high]; arr[high] = tmp;
    return i + 1;
}`,
      pseudo: `QUICKSORT(A, low, high):
  IF low < high:
    pi = PARTITION(A, low, high)
    QUICKSORT(A, low, pi - 1)
    QUICKSORT(A, pi + 1, high)

PARTITION(A, low, high):
  pivot = A[high]
  i = low - 1
  FOR j = low TO high - 1:
    IF A[j] <= pivot:
      i = i + 1
      SWAP A[i] AND A[j]
  SWAP A[i+1] AND A[high]
  RETURN i + 1`,
    },
  },
}

export const ALGORITHM_ORDER = ['bubble', 'insertion', 'merge', 'quick']