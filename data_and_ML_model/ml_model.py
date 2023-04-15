# ! pip install wheel
# ! pip install pandas
# ! pip install numpy

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import warnings
import pickle

warnings.filterwarnings('ignore')

# ! pip install scikit-learn
# | pip install imbalanced-learn
# ! pip install imblearn
# ! pip install seaborn

from imblearn.over_sampling import RandomOverSampler
from sklearn.model_selection import train_test_split


#import data
data = pd.read_csv("./data_and_ML_model/data/Dyt-desktop.csv", delimiter=";")
pd.set_option("display.max_columns" , None)

##PREP DATA
#function make all data numeric
def prep_Data(ds) :
    #ds.column -> access to the column specified
    #map() -> itarates through the column specified
    ds['Gender']=ds.Gender.map({'Male': 0, 'Female': 1})
    ds['Dyslexia']=ds.Dyslexia.map({'No': 0, 'Yes': 1})
    ds['Nativelang']=ds.Nativelang.map({'No': 0, 'Yes': 1})
    ds['Otherlang']=ds.Otherlang.map({'No': 0, 'Yes': 1})

prep_Data(data)

##OVERSAMPLING
# Class count
count_dyslexia_no, count_dyslexia_yes = data.Dyslexia.value_counts()

# Divide by class
dyslexia_no_df = data[data['Dyslexia'] == 0]
dyslexia_yes_df = data[data['Dyslexia'] == 1]

# Oversample 0-class and concat the DataFrames of both class
dyslexia_yes_df = dyslexia_yes_df.sample(count_dyslexia_no, replace = True)
data = pd.concat([dyslexia_no_df, dyslexia_yes_df], axis=0)

#unique index
data = data.reset_index(drop=True)

#int to float
data = data.apply(lambda x: x.astype('float', errors='ignore'))
#check the data type of each column
for col in data.columns:
    if data[col].dtypes != "float64":
        #no prints means OK
        print("Column {} is not a float, it is {}".format(col, data[col].dtypes))


## HANDLING OUTLIERS
def remove_outliers_manually(df):
    print("Old Shape: ", df.shape)
    
    #Accuracy and Missrate
    for i in range(int(df.shape[1]/6)):
        col_acc_rate = df.columns[8+6*i:10+6*i]
        for j in col_acc_rate:
            df.drop(df[df[j] > 1].index, inplace=True)
    print("New Shape: ", df.shape)

remove_outliers_manually(data)

##VARIABLES - Percentile method
data_Q = data.drop(columns = ['Gender','Nativelang','Otherlang','Age','Dyslexia'], axis = 1) #User Info 

def remove_outliers(ds):
    print("Old Shape: ", ds.shape)
    
    rng = ds.columns
    for col in rng:
        #first percentile
        min_threshold = ds[col].quantile(0.001)
        #third percentile
        max_threshold = ds[col].quantile(0.999)
        
        ds.drop(ds[(ds[col] < min_threshold) | (ds[col] > max_threshold)].index, inplace=True)
        
    print("New Shape: ", ds.shape)

remove_outliers(data_Q)

#remoce variables
for i in range(32):
    columns = ['Accuracy'+str(i+1), 'Missrate'+str(i+1), 'Score'+str(i+1)]
    try:
        
        data = data.drop(columns, axis=1)
    except KeyError:
        print("Colmuns not found: ",columns)



y = data['Dyslexia']
X = data.loc[:, data.columns != 'Dyslexia']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=4, stratify = y)


## MACHINE LEARNIG MODELS - Support Vector Machines
from sklearn import svm
# Train Model and Predict 
mod_SVM = svm.SVC(kernel='poly', degree=15, coef0=7).fit(X_train, y_train) 
# Test Model
y_hat_SVM = mod_SVM.predict(X_test)

#save the model
pickle.dump(mod_SVM, open("ml_model.sav", "wb"))

####################################################################

##TEST 
from sklearn import metrics
from sklearn.metrics import classification_report, confusion_matrix
from sklearn.metrics import precision_score, recall_score
from sklearn.metrics import f1_score, jaccard_score

import itertools

def plot_confusion_matrix(cm, classes):
    # Create figure and axes
    fig, ax = plt.subplots()
    im = ax.imshow(cm, cmap='Blues')

    #add value count to each cell
    fmt = 'd'
    thresh = cm.max() / 3.
    
    #labels value count
    for i, j in itertools.product(range(cm.shape[0]), range(cm.shape[1])):
        plt.text(j, i, format(cm[i, j], fmt),
                 horizontalalignment="center",
                 color="white" if cm[i, j] > thresh else "black")

    #set axis labels
    ax.set_xticks(np.arange(len(classes)))
    ax.set_yticks(np.arange(len(classes)))
    ax.set_xticklabels(classes)
    ax.set_yticklabels(classes)
    ax.set_ylabel('True label')
    ax.set_xlabel('Predicted label')

    #colorbar
    cbar = ax.figure.colorbar(im, ax=ax)

    plt.show()

def evaluate_model(X_train, y_train, X_test, y_test, model):
    
    y_hat = model.predict(X_test)
    
    #different evaluations
    print("Train set Accuracy: ", metrics.accuracy_score(y_train, model.predict(X_train)))
    print("Test set Accuracy: ", metrics.accuracy_score(y_test, y_hat))
    '''
    print("Recall 0's: ", recall_score(y_test, y_hat, pos_label=0))
    print("Recall 1's: ", recall_score(y_test, y_hat, pos_label=1))
    print("F1 score 0's: ", f1_score(y_test, y_hat, pos_label=0))
    print("F1 score 1's: ", f1_score(y_test, y_hat, pos_label=1))
    '''
    print("Jaccard index 0's: ", jaccard_score(y_test, y_hat, pos_label = 0))
    print("Jaccard index 1's: ", jaccard_score(y_test, y_hat, pos_label = 1))
    print("\n")
    
    #classification report
    print (classification_report(y_test, y_hat))
    print("\n")

    #compute confusion matrix
    cm = confusion_matrix(y_test, y_hat, labels=[0,1])
    np.set_printoptions(precision = 2)

    #plot confusion matrix
    plot_confusion_matrix(cm, classes=['No = 0','Yes = 1'])

evaluate_model(X_train, y_train, X_test, y_test, mod_SVM)