Matrix1 = [[0 for x in xrange(100)] for x in xrange(100)] 
Matrix2 = [[0 for x in xrange(100)] for x in xrange(100)] 
sx,sy=45,45
for l in xrange(5):
    for i,cell in enumerate(raw_input()):
        Matrix1[sy][sx+i]=1 if cell == 'X' else 0
    sy+=1
def lifeloop(Mat1, Mat2):
    counter=0
    for y in xrange(1,99):
        for x in xrange(1,99):
            alive=sum(Mat1[a][b] for (a,b) in [[y-1,x-1],[y-1,x],[y-1,x+1],[y,x-1],[y,x+1],[y+1,x-1],[y+1,x],[y+1,x+1]])
            if Mat1[y][x] == 0:
                if alive == 3:
                    Mat2[y][x] = 1
                    counter+=1
                else:          Mat2[y][x] = 0
            else:
                if alive == 2 or alive == 3:
                    Mat2[y][x] = 1
                    counter+=1
                else:                        Mat2[y][x] = 0
    return counter
for i in xrange(5):
    print lifeloop(Matrix1, Matrix2),
    Matrix1,Matrix2=Matrix2,Matrix1
