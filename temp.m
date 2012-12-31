mkdir('choosed');
choosed_model;
choosed_other_class_index = randperm(1814);
for m = 1:length(choosed_model)
    choosed_other_class_index(find...
        (choosed_other_class_index == choosed_model(m))) = [];
end

for m = 1:length(choosed_model)
    copyfile(['m',num2str(choosed_model(m))], ['./choosed/m',num2str(choosed_model(m))]);
end


for m = 125:length(choosed_model)+1
    copyfile(['m',num2str(choosed_other_class_index(m))], ['./choosed/m',num2str(choosed_other_class_index(m))]);
end


