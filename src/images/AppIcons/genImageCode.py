import os

def main():
  path='./'
  for filename in os.listdir(path):
    if ('.py' in filename):
      continue
    if ('copy' in filename):
      os.remove(path + filename)
    objectName = filename.replace('-', '_').upper().replace('.PNG', '') + ": require('./AppIcons/" + filename + "'),"
    print(objectName)

if __name__ == '__main__':
  main()