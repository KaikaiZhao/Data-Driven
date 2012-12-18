image_size = 10
feature_size = 45;
currentdir = 'm504';
feature_file = dir(fullfile('./','*chosed*.csv'));
current_model_data = zeros(length(feature_file), feature_size);
for m = 1:length(feature_file)
        tempdata =  load(feature_file(m).name);
        current_model_data(m,:) = tempdata;
end

trainfeature = zeros(model_number, feature_size);
labels = zeros(1,model_number);
labels(1:same_model_number) = 1;
labels(same_model_number:end) = -1;

cd('..');
list = dir();



for n = 1:length(list)-2
    min = 99999999;
    if(strcmp(list(n+2).name, currentdir) == 1)
        continue;
    end
    cd(list(dirindex).name);
    feature_file = dir(fullfile('./','*chosed*.csv'));
    test_model_data = zeros(length(feature_file), feature_size);
    for m = 1:length(feature_file)
        tempdata =  load(feature_file(m).name);
        test_model_data(m,:) = tempdata;
    end
    tempindex = 0;
    for j = 1:image_size
        if(sqrt(sum(current_model_data(n,:) .* test_model_data(j,:))) < min)
            trainfeature(n,:) = test_model_data(j,:);
            tempindex = j;
        end
    end
end 

for n = 1:other_model_number
    min = 99999999;
    feature_file = dir(fullfile('./','*chosed*.csv'));

    test_model_data = zeros(length(file_list), feature_size);
    for m = 1:length(file_list)
        tempdata =  load(file_for(m).name);
        test_model_data(m,:) = tempdata;
    end
    for j = 1:image_size
        if(sqrt(sum(current_model_data(n,:) .* test_model_data(j,:))) < min)
            trainfeature(n,:) = test_model_data(j,:);
        end
    end
end 
