list = dir();
for m = 3:length(list)
    cd(list(m).name);
    filelist = dir(fullfile('./','sample_*.bmp'));
    if(length(filelist) < 42)
        delete('*.bmp');
        filelist = dir(fullfile('./','*.off'));
        sample(filelist(1).name, 'off');
    end
    cd('..');
end
