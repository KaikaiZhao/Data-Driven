model = Off2Patch('m60.off');
value = max(model.vertices);
max_x = value(1);
max_y = value(2);
max_z = value(3);
value = min(model.vertices);
min_x = value(1);
min_y = value(2);
min_z = value(3);
center_x = (max_x + min_x)/2;
center_y = (max_y + min_y)/2;
center_z = (max_z + min_z)/2;
radius = sqrt(((max_x - min_x)/2)^2 + ((max_x - min_x)/2)^2 + ((max_x - min_x)/2)^2);
[vertices, faces] = platonic_solid(4, radius);
%vertices(:, 1) = vertices(:, 1) + center_x;
%vertices(:, 2) = vertices(:, 2) + center_y;
%vertices(:, 3) = vertices(:, 3) + center_z;
tempVertices = vertices';
tempFaces = faces'
[tempVertices, tempFaces] = loopSubdivision(tempVertices, tempFaces);
tempVertices = tempVertices';
tempFaces = tempFaces';
%graph = patch('faces',tempFaces, 'vertices',tempVertices);
%graph = patch('faces',model.faces, 'vertices',model.vertices);

%set(graph,'FaceAlpha',0);



%view(tempVertices(1, :));
