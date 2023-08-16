A = [100,50,200,50,200]

min = A[0]
max = A[0]
count = 0
for i in range(1, len(A)):
    if A[i] < min:
        count+=1
        min = A[i]

    elif A[i] > max:
        count+=1
        max = A[i] 

print(count)