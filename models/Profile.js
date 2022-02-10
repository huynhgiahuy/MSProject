const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  adminname: {
    type: String,
    required: true
  },
  gender: {
    type: String
  },
  status: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    required: true
  },
  product: [
    {
      title: {
        type: String,
        required: true
      },
      productid: {
        type: String,
        required: true
      },
      soluong: {
        type: String,
        required: true
      },
      dongia: {
        type: String,
        required: true
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      supplierid: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  invoice: [
    {
      invoiceid: {
        type: String,
        required: true
      },
      productid: {
        type: String,
        required: true
      },
      supplierid: {
        type: String,
      },
      from: {
        type: Date,
        required: true
      },
      to: {
        type: Date
      },
      soluong: {
        type: String,
        required: true
      },
      dongia: {
        type: String,
        required: true
      },
      thanhtien: {
        type: String,
        required: true
      },
      description: {
        type: String
      }
    }
  ],
  supplier: [
    {
      supplierid: {
        type: String,
        required: true
      },
      suppliername: {
        type: String,
        required: true
      },
      supplieremail: {
        type: String
      },
      supplieraddress: {
        type: String
      },
      productid: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  client: [
    {
      clientid: {
        type: String,
        required: true
      },
      clientname: {
        type: String,
        required: true
      },
      clientemail: {
        type: String
      },
      clientaddress: {
        type: String
      },
      clientcity: {
        type: String
      },
      description: {
        type: String
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('profile', ProfileSchema);
