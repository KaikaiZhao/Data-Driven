list = dir();
for m = 3:length(list)
    cd(list(m).name);
    delete('*.csv');
    delete('*chosed*');
    file_list = dir(fullfile('./','sample_*.bmp'));
    for n = 1:length(file_list)
        getfeature(file_list(n).name);
    end
    cd('..');
end