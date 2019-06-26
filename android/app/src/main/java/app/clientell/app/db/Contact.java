package app.clientell.app.db;

public class Contact {
    int _id;
    String _name;
    String _rating;
    String _phone_number;
    public Contact(){   }
    public Contact(int id, String name, String _phone_number, String _rating){
        this._id = id;
        this._name = name;
        this._phone_number = _phone_number;
        this._rating = _rating;
    }

    public Contact(String name, String _phone_number, String _rating){
        this._name = name;
        this._phone_number = _phone_number;
        this._rating = _rating;
    }
    public int getID(){
        return this._id;
    }

    public void setID(int id){
        this._id = id;
    }

    public String getRating(){
        return this._rating;
    }

    public void setRating(String rating){
        this._rating = rating;
    }

    public String getName(){
        return this._name;
    }

    public void setName(String name){
        this._name = name;
    }

    public String getPhoneNumber(){
        return this._phone_number;
    }

    public void setPhoneNumber(String phone_number){
        this._phone_number = phone_number;
    }
}