function structed_class = read_PSBCla(file_name)
%READPSBCLA Summary of this function goes here
%   Detailed explanation goes here
    fid = fopen(file_name);
    textscan(fid,'%s%u',1);
    temp = cell2mat(textscan(fid,'%u%u',1));
    class_number = temp(1);
    model_number = temp(2);
    for m = 1:class_number
        temp = textscan(fid,'%s%s%u',1);
        structed_class(m).name = temp{1};
        structed_class(m).number = temp{3};
        structed_class(m).model_index = textscan(fid,'%u',structed_class(m).number);
        structed_class(m).model_index = structed_class(m).model_index{1};
    end
end

