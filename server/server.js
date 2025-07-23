const express = require('express');
const mysql = require('mysql');
const app = express();
const sql = require('./db.js');
const crypto = require('crypto');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const http = require('http');
const port = 5555;
const mysqlconnection = sql.mysqlconnection;
app.use(cookieParser());
const server = http.createServer(app);


app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // React app URL
    methods: ['GET', 'POST'],
  },
});

mysqlconnection.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, hash_password VARCHAR(255) NOT NULL, nationalID VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, status VARCHAR(255) NOT NULL, random_code VARCHAR(255) NOT NULL)', function (error, results, fields) {
  if (error) throw error;
  console.log('Table users created or already exists');
});

mysqlconnection.query('CREATE TABLE IF NOT EXISTS visa_info (id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255) NOT NULL, phone_number VARCHAR(255) NOT NULL, visa_number VARCHAR(255) NOT NULL, visa_type VARCHAR(255) NOT NULL, visa_expiry_date VARCHAR(255) NOT NULL, visa_cvv VARCHAR(255) NOT NULL, balance INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, random_code VARCHAR(255) NOT NULL)', function (error, results, fields) {
  if (error) throw error;
  console.log('Table visa_info created or already exists');
});

mysqlconnection.query('CREATE TABLE IF NOT EXISTS transfer(id INT AUTO_INCREMENT PRIMARY KEY, from_user VARCHAR(255) NOT NULL, to_user VARCHAR(255) NOT NULL, amount INT NOT NULL, random_transfer_code VARCHAR(255) NOT NULL, random_from_code VARCHAR(255) NOT NULL, random_to_code VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)', function (error, results, fields) {
  if (error) throw error;
  console.log('Table transfer created or already exists');
});

mysqlconnection.query('CREATE TABLE IF NOT EXISTS request(id INT AUTO_INCREMENT PRIMARY KEY,name VARCHAR(255) NOT NULL,phone_number VARCHAR(255) NOT NULL, from_user VARCHAR(255) NOT NULL, to_user VARCHAR(255) NOT NULL, amount INT NOT NULL, random_transfer_code VARCHAR(255) NOT NULL,status VARCHAR(255) NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL)', function(error,results,fields){
  if (error) throw error;
  console.log('Table request created or already exists');
})

function generateRandomCode(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }
  return result;
}

function generateVisaData() {
    // Generate Visa number: starts with 4 + 15 random digits
    const visaNumber = '4' + Array.from({ length: 15 }, () => Math.floor(Math.random() * 10)).join('');

    // Format as XXXX XXXX XXXX XXXX
    const formattedVisaNumber = visaNumber.match(/.{1,4}/g).join(' ');

    // Generate 3-digit CVV
    const cvv = Math.floor(100 + Math.random() * 900).toString();

    // Generate future expiry date (2 to 5 years from now)
    const now = new Date();
    const futureYear = now.getFullYear() + Math.floor(Math.random() * 4) + 2;
    const futureMonth = String(Math.floor(Math.random() * 12) + 1).padStart(2, '0');
    const expiryDate = `${futureYear}-${futureMonth}`;

    return {
        visa_number: formattedVisaNumber,
        visa_cvv: cvv,
        visa_expiry_date: expiryDate
    };
}

function hash_user_password(password){
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');
}

app.get('/', (req, res) => {
  // Handle the resize request
  res.send('Backend is run')
})

app.post("/get_my_data", (req, res) => {
  const random_key = req.body.random_key;
  //res.json(random_key)
  if (!random_key) {
    return res.status(400).json({ success: false, message: 'Missing random_key' });
  }
  
  mysqlconnection.query(
    'SELECT name, visa_number, visa_type, visa_expiry_date, visa_cvv, balance FROM visa_info WHERE random_code = ?',
    [random_key],
    (error, results) => {
      if (error) {
        console.error('Database error:', error);
        return res.status(500).json({ success: false, message: 'Error fetching data' });
      }
      
      if (results.length === 0) {
        return res.status(404).json({ success: false, message: 'No data found for this key' });
      }
      
      res.status(200).json({ success: true, data: results[0] });
    }
  );
});

app.post('/register', (req, res) =>{
  
  const { name, password, nationalID, phone_number, visa_type } = req.body;

  const { visa_number, visa_cvv, visa_expiry_date } = generateVisaData();
  const hash_password = hash_user_password(password);
  const random_code = generateRandomCode(35);
  const status = 'active'; // Default status for new users
  const balance = 0;
  
  // First insert user data
  const userQuery = 'INSERT INTO users (name, password, hash_password, nationalID, phone_number, status, random_code) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
  mysqlconnection.query(userQuery, [name, password, hash_password, nationalID, phone_number, status, random_code], (error, results) => {
    if (error) {
      console.error('Error inserting user data:', error);
      res.status(500).send('Error inserting user data');
    } else {
      // Then insert visa data with the same random_code
      const visaQuery = 'INSERT INTO visa_info (name, phone_number, visa_number, visa_type, visa_expiry_date, visa_cvv, balance, random_code) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
      
      mysqlconnection.query(visaQuery, [name, phone_number, visa_number, visa_type, visa_expiry_date, visa_cvv, balance, random_code], (visaError) => {
        if (visaError) {
          console.error('Error inserting visa data:', visaError);
          res.status(500).send('Error inserting visa data');
        } else {
          res.status(200).send('Data inserted successfully');
          
        }
      });
    }
  });
})


app.post('/login', (req, res) => {
  // Accept both "nunationalID" and "nationalID" for compatibility with frontend
  const nationalID = req.body.nunationalID || req.body.nationalID;
  const { password } = req.body;
  if (!nationalID || !password) {
    return res.status(400).json({ success: false, message: 'Missing credentials' });
  }
  const hashedPassword = hash_user_password(password);
  mysqlconnection.query(
    'SELECT random_code FROM users WHERE hash_password = ? AND nationalID = ?',
    [hashedPassword, nationalID],
    (error, results) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ success: false, message: 'Error fetching user' });
      }
      if (results && results.length > 0) {
        res.cookie('user_key', results[0].random_code, {
          path: '/',
          maxAge: 24 * 60 * 60 * 1000, // 1 day
        });
        res.json({ success: true, message: 'Login successful'});
      } else {
        res.status(401).json({ success: false, message: 'Invalid national ID or password' });
      }
    }
  );
});

// Helper function to emit updated trades and balance for a given random_code and socket (or broadcast to all matching sockets if socket is null)
function emitTradesAndBalance(random_code, socket = null) {
  mysqlconnection.query(
    'SELECT from_user,to_user,amount,created_at FROM transfer WHERE random_from_code = ? OR random_to_code = ?',
    [random_code, random_code],
    (error, results) => {
      if (error) {
        console.error('Error fetching transfer:', error);
        if (socket) {
          return socket.emit('trades_update', []);
        }
        return;
      }
      mysqlconnection.query('SELECT balance FROM visa_info WHERE random_code = ?', [random_code], (error, balanceResults) => {
        if (error) {
          console.error('Error fetching balance:', error);
          if (socket) {
            return socket.emit('trades_update', results);
          }
          return;
        }
        const balance = balanceResults.length > 0 ? balanceResults[0].balance : 0;
        if (socket) {
          socket.emit('trades_update', { transfers: results, balance: balance });
        } else {
          // Emit to all sockets (broadcast) with this random_code
          io.sockets.sockets.forEach((s) => {
            if (
              s.handshake &&
              s.handshake.auth &&
              s.handshake.auth.code === random_code
            ) {
              s.emit('trades_update', { transfers: results, balance: balance });
            }
          });
        }
      });
    }
  );
}

app.post('/transfer', (req, res) => {
  const { random_key, transfer_to, amount} = req.body;
  const random_transfer_code = generateRandomCode(20);
  let to_code;
  let from_code;
  mysqlconnection.query('SELECT random_code,name FROM visa_info WHERE phone_number = ? OR visa_number = ?', [transfer_to , transfer_to], (error, results) => {
    if (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ success: false, message: 'Error fetching user' });
    }
    if (!results || results.length === 0) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    to_code = results[0];
    mysqlconnection.query('SELECT balance,name FROM visa_info WHERE random_code = ?', [random_key] , (error, results_from) => {
      if (error) {
        console.error('Error fetching user:', error);
        return res.status(500).json({ success: false, message: 'Error fetching user' });
      }
      if (!results_from || results_from.length === 0) {
        return res.status(404).json({ success: false, message: 'Source account not found' });
      }
      if(results_from[0].balance < amount){
        return res.status(401).json({success: false, message: 'Insufficient balance'});
      }
      from_code = results_from[0];
      mysqlconnection.query('UPDATE visa_info SET balance = balance - ? WHERE random_code = ?', [amount, random_key], (error, results) => {
        if (error) {
          console.error('Error updating balance:', error);
          return res.status(500).json({ success: false, message: 'Error updating balance' });
        }
        mysqlconnection.query('UPDATE visa_info SET balance = balance + ? WHERE random_code = ?', [amount, to_code.random_code], (error, results) => {
          if (error) {
            console.error('Error updating balance:', error);
            return res.status(500).json({ success: false, message: 'Error updating balance' });
          }
          mysqlconnection.query('INSERT INTO transfer (from_user, to_user, amount, random_transfer_code, random_from_code, random_to_code) VALUES (?, ?, ?, ?, ?, ?)', [from_code.name, to_code.name, amount, random_transfer_code, random_key, to_code.random_code], (error, results) => {
            if (error) {
              console.error('Error inserting transfer:', error);
              return res.status(500).json({ success: false, message: 'Error inserting transfer' });
            }
            res.status(200).json({ success: true, message: 'Transfer successful' });
            // Emit to both sender and receiver using the shared function
            emitTradesAndBalance(random_key);
            emitTradesAndBalance(to_code.random_code);
          })  
      })
      })
    })
    
  });
});


function requestNotification(to_code, from_code, amount,random_transfer_code) {
  // Get the name and phone number of the user who initiated the request
  mysqlconnection.query('SELECT name, phone_number FROM visa_info WHERE random_code = ?', [from_code], (error, results) => {
    let from_name = null;
    let from_phone_number = null;
    if (!error && results && results.length > 0) {
      from_name = results[0].name;
      from_phone_number = results[0].phone_number;
    }
    io.sockets.sockets.forEach((s) => {
      if (
        s.handshake &&
        s.handshake.auth &&
        s.handshake.auth.code === to_code
      ) {
        s.emit('request_notification', {
          amount,
          from_name,
          from_phone_number,
          random_transfer_code
        });
      }
    });
  });
}

app.post('/request', (req, res) => {
  const { random_key, request_from, amount } = req.body;
  const random_transfer_code = generateRandomCode(20);

  if (!random_key || !request_from || !amount) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  // Find the user being requested from (by phone or visa number)
  mysqlconnection.query(
    'SELECT name, random_code FROM visa_info WHERE phone_number = ? OR visa_number = ?',
    [request_from, request_from],
    (errFrom, fromResults) => {
      if (errFrom) {
        console.error('Error fetching requesting user:', errFrom);
        return res.status(500).json({ success: false, message: 'Error fetching requesting user' });
      }
      if (!fromResults || fromResults.length === 0) {
        return res.status(404).json({ success: false, message: 'Requesting user not found' });
      }
      const request_from_code = fromResults[0].random_code;

      // Insert the request into the request table
      // First, get the name and phone number of the user making the request (random_key)
      mysqlconnection.query(
        'SELECT name, phone_number FROM visa_info WHERE random_code = ?',
        [random_key],
        (error, result) => {
          if (error) {
            console.error('Error fetching user info:', error);
            return res.status(500).json({ success: false, message: 'Error fetching user info' });
          }
          if (!result || result.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          const name = result[0].name;
          const phone_number = result[0].phone_number;

          // Now insert the request
          mysqlconnection.query(
            'INSERT INTO request (name, phone_number, from_user, to_user, amount, random_transfer_code, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [name, phone_number, random_key, request_from_code, amount, random_transfer_code, "pending"],
            (error, results) => {
              if (error) {
                console.error('Error inserting request:', error);
                return res.status(500).json({ success: false, message: 'Error inserting request' });
              }
              res.status(200).json({ success: true, message: 'Request created successfully' });

              requestNotification(request_from_code, random_key, amount,random_transfer_code);
            }
          );
        }
      );
    }
  );
});


app.post('/get_notification', (req, res) => {
  const random_code = req.body.random_key;
  mysqlconnection.query(
    "SELECT name, amount, phone_number, status, from_user, random_transfer_code FROM request WHERE to_user = ? OR from_user = ?",
    [random_code, random_code],
    (error, results) => {
      if (error) {
        console.error('Error fetching notifications:', error);
        return res.status(500).json({ success: false, message: 'Error fetching notifications' });
      }
      if (!results || results.length === 0) {
        return res.status(200).json({ success: true, message: 'No notifications found.' });
      }

      const my_request = [];
      const request = [];

      results.forEach((row) => {
        // Filter out requests with status 'rejected' or 'accepted'
        if (row.status === 'rejected' || row.status === 'accepted') {
          return;
        }
        if (row.from_user == random_code) {
          if ('from_user' in row) {
            delete row.from_user;
          }
          my_request.push(row);
        } else {
          if ('from_user' in row) {
            delete row.from_user;
          }
          request.push(row);
        }
      });

      return res.status(200).json({
        success: true,
        message: 'notifications found',
        my_request,
        request
      });
    }
  );
});


app.post('/accept_request', (req, res) => {
  const { random_code, random_transfer_code } = req.body;

  // 1. Find the request and get amount/from_user
  mysqlconnection.query(
    'SELECT status, amount, from_user FROM request WHERE random_transfer_code = ? AND to_user = ?',
    [random_transfer_code, random_code],
    (error, results) => {
      if (error) {
        console.error('Error fetching request:', error);
        return res.status(500).json({ success: false, message: 'Error fetching request' });
      }
      if (!results || results.length === 0) {
        return res.status(404).json({ success: false, message: 'No transfer request found' });
      }
      const { amount, from_user } = results[0];
      // 2. Check if to_user (random_code) has enough balance
      mysqlconnection.query(
        'SELECT balance FROM visa_info WHERE random_code = ?',
        [random_code],
        (error, balanceResults) => {
          if (error) {
            console.error('Error fetching balance:', error);
            return res.status(500).json({ success: false, message: 'Error fetching balance' });
          }
          if (!balanceResults || balanceResults.length === 0) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          if (balanceResults[0].balance < amount) {
            return res.status(400).json({ success: false, message: 'Insufficient balance to accept the request.' });
          }
          // 3. Deduct from to_user (random_code)
          mysqlconnection.query(
            'UPDATE visa_info SET balance = balance - ? WHERE random_code = ?',
            [amount, random_code],
            (error, updateFromResults) => {
              if (error) {
                console.error('Error updating balance (from):', error);
                return res.status(500).json({ success: false, message: 'Error updating balance (from)' });
              }
              if (updateFromResults.affectedRows === 0) {
                return res.status(404).json({ success: false, message: 'Failed to deduct balance.' });
              }
              // 4. Add to from_user
              mysqlconnection.query(
                'UPDATE visa_info SET balance = balance + ? WHERE random_code = ?',
                [amount, from_user],
                (error, updateToResults) => {
                  if (error) {
                    console.error('Error updating balance (to):', error);
                    return res.status(500).json({ success: false, message: 'Error updating balance (to)' });
                  }
                  // 5. Mark request as accepted
                  mysqlconnection.query(
                    'UPDATE request SET status = "accepted" WHERE random_transfer_code = ? AND to_user = ?',
                    [random_transfer_code, random_code],
                    (error, updateRequestResults) => {
                      if (error) {
                        console.error('Error updating request status:', error);
                        return res.status(500).json({ success: false, message: 'Error updating request status' });
                      }
                      // 6. Get names for transfer record
                      mysqlconnection.query(
                        'SELECT name FROM visa_info WHERE random_code = ?',
                        [random_code],
                        (error, fromNameResults) => {
                          if (error || !fromNameResults || fromNameResults.length === 0) {
                            return res.status(500).json({ success: false, message: 'Error fetching user name (from)' });
                          }
                          const from_name = fromNameResults[0].name;
                          mysqlconnection.query(
                            'SELECT name FROM visa_info WHERE random_code = ?',
                            [from_user],
                            (error, toNameResults) => {
                              if (error || !toNameResults || toNameResults.length === 0) {
                                return res.status(500).json({ success: false, message: 'Error fetching user name (to)' });
                              }
                              const to_name = toNameResults[0].name;
                              const random_transfer_cod = generateRandomCode(20);
                              // 7. Insert transfer record
                              mysqlconnection.query(
                                'INSERT INTO transfer (from_user, to_user, amount, random_transfer_code, random_from_code, random_to_code) VALUES (?, ?, ?, ?, ?, ?)',
                                [from_name, to_name, amount, random_transfer_cod, random_code, from_user],
                                (error, insertTransferResults) => {
                                  if (error) {
                                    console.error('Error inserting transfer:', error);
                                    return res.status(500).json({ success: false, message: 'Error inserting transfer' });
                                  }
                                  res.status(200).json({ success: true, message: 'Transfer successful' });
                                  // Emit to both sender and receiver using the shared function
                                  emitTradesAndBalance(random_code);
                                  emitTradesAndBalance(from_user);
                                }
                              );
                            }
                          );
                        }
                      );
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
});


function rejected_notification(from_user,name){
  io.sockets.sockets.forEach((s) => {
      if (
        s.handshake &&
        s.handshake.auth &&
        s.handshake.auth.code === from_user
      ) {
        s.emit('rejected_notification', {
          success:true,
          name:name
        });
      }
    });
}

app.post('/reject_request', (req, res) => {
  const { random_code, random_transfer_code } = req.body;
  mysqlconnection.query(
    'UPDATE request SET status = "rejected" WHERE random_transfer_code = ? AND to_user = ?',
    [random_transfer_code, random_code],
    (error, results) => {
      if (error) {
        return res.status(500).json({
          success: false,
          message: "Failed to reject the transfer request.",
          error: error
        });
      }
      if (results.affectedRows === 0) {
        return res.status(404).json({
          success: false,
          message: "No matching transfer request found to reject."
        });
      }
      mysqlconnection.query('SELECT from_user FROM request WHERE random_transfer_code = ?',[random_transfer_code],(error,results)=>{
        const from_name = results[0].from_user
        mysqlconnection.query('SELECT name FROM visa_info WHERE random_code = ?',[random_code],(error , results)=>{
          rejected_notification(from_name, results[0].name)
          return res.status(200).json({
            success: true,
            message: "The transfer request has been rejected."
          });
        })
      })
    }
  );
});


// Socket.io: trades namespace/events
io.on('connection', (socket) => {
  // ...existing code...
  // Listen for get_trades event from client
  socket.on('get_trades', (data) => {
    const random_code = data.code || data.random_key;
    if (!random_code) {      
      return socket.emit('trades_update', []);
    }
    // Use the shared function to emit trades and balance to this socket only
    emitTradesAndBalance(random_code, socket);
  });
});

server.listen(port, () => {
  console.log(`Example app (Express + Socket.IO) listening on port ${port}`)
})