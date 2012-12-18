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

