function [vertexs, faces]=GetRegularIcosahedron
t = 0:2*pi/5:(2*pi-2*pi/5);
vertexs = [cos(t'),sin(t'),zeros(5,1)];
t = t'+pi/5;
a = 2*sin(pi/5);
vertexs=[vertexs;cos(t),sin(t),a*sqrt(3)*ones(5,1)/2];
h = sqrt(0.75*a^2-cos(pi/5)^2);
vertexs = [0 0 -h;vertexs;0 0 a*sqrt(3)/2+h];
vertexs = vertexs - [zeros(12,2), ones([12,1])*0.5];
for i = 1 :12
    vertexs(i, :) = vertexs(i, :)/norm(vertexs(i, :), 2);
end
faces = [1 2 3
       1 3 4
       1 4 5
       1 5 6
       1 6 2
       2 3 7
       2 6 11
       2 7 11
       3 7 8
       3 4 8
       4 8 9
       4 5 9
       5 9 10
       5 6 10
       6 10 11
       7 8 12
       8 9 12
       9 10 12
       10 11 12
       7 11 12];
change = 0;
for i =1 : 20
    if(det([vertexs(faces(i, 1), :);
            vertexs(faces(i, 2), :);
            vertexs(faces(i, 3), :)])<0);
        change = change+1;
        faces(i, :) = [faces(i, 1);faces(i, 3);faces(i, 2)];
    end
end